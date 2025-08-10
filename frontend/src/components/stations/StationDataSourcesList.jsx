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
    const token = localStorage.getItem('token');
    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        if (data) {
            setTypes(data.map((d) => d.type).sort());
            setDataSources(data);
            setFilteredDataSources(data);
        }
    }, [data]);

    const insertNewDataSourceSelector = async () => {
        await doFetch('http://localhost:8080/api/admin/datasources', options);
    };

    const selectNewDataSource = (e) => {
        setForm((prev) => ({
            ...prev,
            dataSources: [...prev.dataSources, data.filter((ds) => ds.id === parseInt(e.currentTarget.value))[0]],
        }));
        setFilteredDataSources([]);
    };

    const filterDataSourcesByType = (e) => {
        const type = e.currentTarget.value;
        setFilteredDataSources(dataSources.filter((p) => p.type === type));
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

    const removeDataSourcePicker = () => {
        setFilteredDataSources([]);
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
                <IconButton title="Remove datasource" onClick={deleteDataSource} icon={<IoTrashOutline />} />
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
            {ds.name} - {ds.sourceIdentifier}
        </option>
    ));

    return (
        <>
            <div className="mb-1 flex justify-between items-center">
                <span>Datasources</span>
                <button type="button" className="link" onClick={insertNewDataSourceSelector}>
                    <span className="flex flex-row gap-x-1 items-center">
                        <IoAddCircleOutline className="color-text text-lg" />
                        Add
                    </span>
                </button>
            </div>

            <div className="flex flex-col gap-y-2">
                <div className="card flex flex-col table">
                    <div className="grid table-header font-bold text-lg w-full">
                        <span>Order</span>
                        <span>Type</span>
                        <span>Name</span>
                        <span>Identifier</span>
                    </div>
                    {stationDataSources && renderedDataSources}
                    {filteredDataSources.length > 0 && (
                        <div className="grid items-center px-6 py-4 new-data-source-picker">
                            <span className="temp-order">{stationDataSources.length + 1}</span>
                            <select name="type" onChange={filterDataSourcesByType}>
                                <option value="" disabled selected>
                                    Filter by type
                                </option>
                                {renderedTypeOptions}
                            </select>
                            <select name="datasource" onChange={selectNewDataSource}>
                                <option value="" disabled selected>
                                    Select a datasource
                                </option>
                                {renderedDataSourceOptions}
                            </select>
                            <IconButton title="Cancel" onClick={removeDataSourcePicker} icon={<MdOutlineCancel />} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default StationDataSourcesList;
