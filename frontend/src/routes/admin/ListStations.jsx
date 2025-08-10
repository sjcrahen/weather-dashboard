import MainContent from '../../components/layout/MainContent.jsx';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader.jsx';
import Layout from '../../components/layout/Layout.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { useEffect, useMemo } from 'react';

function ListStations() {
    const navigate = useNavigate();
    const { data, loading, error, doFetch } = useFetch();
    const token = localStorage.getItem('token');

    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/admin/stations`, options);
    }, [doFetch, options]);

    const editStation = (e) => {
        navigate(`/admin/stations/${e.currentTarget.dataset.slug}`);
    };

    const renderedDataRows = Array.isArray(data)
        ? data.map((station) => (
              <button
                  key={station.id}
                  onClick={editStation}
                  className={'table-item grid grid-cols-6 justify-items-start px-6 py-4'}
                  data-title={'Click to edit'}
                  data-slug={station.slug}
              >
                  <span>{station.name}</span>
                  <span>{station.slug}</span>
                  <span>{station.city}</span>
                  <span>{station.state}</span>
                  <span>{station.latitude}</span>
                  <span>{station.longitude}</span>
              </button>
          ))
        : null;

    return (
        <Layout>
            <PageHeader label={'Stations'} />
            <MainContent data={data} loading={loading} error={error}>
                {!loading && !error && data?.length && (
                    <div className={'card flex flex-col table'}>
                        <div className={'table-header grid grid-cols-6 font-bold text-lg w-full'}>
                            <span>Name</span>
                            <span>Slug</span>
                            <span>City</span>
                            <span>State</span>
                            <span>Latitude</span>
                            <span>Longitude</span>
                        </div>
                        {data && renderedDataRows}
                    </div>
                )}
                {!loading && !error && data?.length === 0 && <p>No stations found.</p>}
            </MainContent>
        </Layout>
    );
}

export default ListStations;
