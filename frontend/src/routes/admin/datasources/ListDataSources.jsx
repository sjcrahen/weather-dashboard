import MainContent from '../../../components/layout/MainContent.jsx';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import Layout from '../../../components/layout/Layout.jsx';
import useFetch from '../../../hooks/useFetch.jsx';
import { useEffect, useMemo } from 'react';
import TooltipWrapper from '../../../components/TooltipWrapper.jsx';

function ListDataSources() {
    const navigate = useNavigate();
    const { data, loading, error, doFetch } = useFetch();
    const token = localStorage.getItem('token');

    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/admin/datasources`, options);
    }, [doFetch, options]);

    const editDataSource = (e) => {
        navigate(`/admin/datasources/${e.currentTarget.dataset.slug}`);
    };

    const renderedDataRows = data?.map((ds) => (
        <TooltipWrapper title="Click to edit" key={ds.id}>
            <button onClick={editDataSource} className="table-item grid grid-cols-3 justify-items-start px-6 py-4 w-full">
                <span>{ds.type}</span>
                <span className="text-left">{ds.name}</span>
                <span>{ds.sourceIdentifier}</span>
            </button>
        </TooltipWrapper>
    ));

    return (
        <Layout>
            <PageHeader label={'Data Sources'} />
            <MainContent data={data} loading={loading} error={error}>
                {!loading && !error && data?.length > 0 && (
                    <div className={'card flex flex-col table overflow-auto'}>
                        <div className={'table-header grid grid-cols-3 font-bold text-lg w-full'}>
                            <span>Type</span>
                            <span>Name</span>
                            <span>Source Id</span>
                        </div>
                        <div className="overflow-auto">{data && renderedDataRows}</div>
                    </div>
                )}
                {!loading && !error && data?.length === 0 && <p>No data sources found.</p>}
            </MainContent>
        </Layout>
    );
}

export default ListDataSources;
