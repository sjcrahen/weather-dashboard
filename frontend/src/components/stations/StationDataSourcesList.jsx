import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5';
import useFetch from '../../hooks/useFetch.jsx';
import { useEffect, useMemo, useState } from 'react';
import IconButton from '../IconButton.jsx';
import { MdOutlineCancel } from 'react-icons/md';

function StationDataSourcesList({ stationDataSources, setForm }) {
    const { data, error, doFetch } = useFetch();
    const [types, setTypes] = useState([]);
    const [dataSources, setDataSources] = useState([]);
    const [filteredDataSources, setFilteredDataSources] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [selectedDataSource, setSelectedDataSource] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const token = localStorage.getItem('token');
    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);
    const stationDataSourceIds = useMemo(() => stationDataSources.map((ds) => ds.id), [stationDataSources]);

    useEffect(() => {
        doFetch('http://localhost:8080/api/admin/datasources', options);
    }, [doFetch, options]);

    useEffect(() => {
        if (data) {
            setTypes(data.map((d) => d.type).sort());
            setDataSources(data);
        }
    }, [data]);

    useEffect(() => {
        if (filterType === '') {
            setFilteredDataSources(dataSources.filter((ds) => !stationDataSourceIds.includes(ds.id)));
        } else {
            setFilteredDataSources(dataSources.filter((ds) => ds.type === filterType && !stationDataSourceIds.includes(ds.id)));
        }
        setSelectedDataSource('');
    }, [filterType, dataSources, stationDataSourceIds]);

    const insertNewDataSourceSelector = async () => {
        setShowPicker(true);
    };

    const resetDataSourcePicker = () => {
        setShowPicker(false);
        setFilteredDataSources([]);
        setFilterType('');
        setSelectedDataSource('');
    };

    const selectNewDataSource = (e) => {
        const id = parseInt(e.target.value);
        const newDataSource = dataSources.find((ds) => ds.id === id);
        if (newDataSource) {
            setForm((prev) => ({
                ...prev,
                dataSources: [...prev.dataSources, newDataSource],
            }));
            resetDataSourcePicker();
        }
    };

    const moveItem = (from, to) => {
        if (to < 0 || to >= stationDataSources.length) return;
        const updated = [...stationDataSources];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);

        setForm((prev) => ({
            ...prev,
            dataSources: updated,
        }));
    };

    const deleteDataSource = (e) => {
        const updated = [...stationDataSources];
        updated.splice(parseInt(e.currentTarget.dataset.index), 1);
        setForm((prev) => ({
            ...prev,
            dataSources: updated,
        }));
    };

    const renderedDataSources = stationDataSources.map((ds, index) => {
        return (
            <div className="grid items-center px-6 py-4 table-item" key={`${ds.id}`}>
                <input
                    type="number"
                    name="order"
                    min="1"
                    max={stationDataSources.length + 1}
                    value={index + 1}
                    onChange={(e) => moveItem(index, e.currentTarget.value - 1)}
                ></input>
                <span>{ds.type}</span>
                <span>{ds.name}</span>
                <span>{ds.sourceIdentifier}</span>
                <IconButton title="Remove datasource" attrs={{ 'data-index': index }} onClick={deleteDataSource} icon={<IoTrashOutline />} />
            </div>
        );
    });

    const renderedTypeOptions = types
        .filter((type, index, arr) => arr.indexOf(type) === index)
        .map((type) => (
            <option key={type} value={type}>
                {type}
            </option>
        ));

    const renderedDataSourceOptions = filteredDataSources.map((ds) => (
        <option key={ds.id} value={ds.id}>
            {ds.sourceIdentifier} - {ds.name.substring(0, Math.min(ds.name.length, 30))}
            {ds.name.length >= 30 ? '...' : ''}
        </option>
    ));

    return (
        <>
            <div className="card flex flex-col table">
                <div className="mb-1 flex justify-between items-center">
                    <span>Datasources</span>
                    <button type="button" className="link" onClick={insertNewDataSourceSelector}>
                        <span className="flex flex-row gap-x-1 items-center">
                            <IoAddCircleOutline className="color-text text-lg" />
                            Add
                        </span>
                    </button>
                </div>
                <div className="grid table-header font-bold text-lg w-full">
                    <span>Order</span>
                    <span>Type</span>
                    <span>Name</span>
                    <span>Identifier</span>
                </div>
                {stationDataSources && renderedDataSources}
                {showPicker && (
                    <div className="grid items-center px-6 py-4 new-data-source-picker">
                        <span className="temp-order">{stationDataSources.length + 1}</span>
                        <select value={filterType} name="type" onChange={(e) => setFilterType(e.target.value)}>
                            <option value="" disabled>
                                Filter by type
                            </option>
                            {renderedTypeOptions}
                        </select>
                        <select value={selectedDataSource} name="datasource" onChange={selectNewDataSource}>
                            <option value="" disabled>
                                Select a datasource
                            </option>
                            {renderedDataSourceOptions}
                        </select>
                        <IconButton title="Cancel" onClick={resetDataSourcePicker} icon={<MdOutlineCancel />} />
                    </div>
                )}
            </div>
        </>
    );
}

export default StationDataSourcesList;
