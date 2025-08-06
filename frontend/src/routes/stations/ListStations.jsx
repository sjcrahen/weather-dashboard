import MainContent from '../../components/MainContent.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import Layout from '../../components/Layout.jsx';
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

    const editStation = e => {
        navigate(`/admin/stations/${e.currentTarget.dataset.slug}`);
    };

    const renderedDataRows = Array.isArray(data)
        ? data?.map(station => (
              <button
                  key={station.id}
                  onClick={editStation}
                  className={'card table row grid grid-cols-6 items-center justify-items-start hover:outline duration-300'}
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
            <Header label={'Stations'} />
            <MainContent data={data} loading={loading} error={error}>
                {!loading && !error && data?.length && (
                    <div className={'flex flex-col gap-y-1'}>
                        <div className={'card table head grid grid-cols-6 font-bold text-lg'}>
                            <span>Name</span>
                            <span>Slug</span>
                            <span>City</span>
                            <span>State</span>
                            <span>Lat</span>
                            <span>Long</span>
                        </div>
                        {renderedDataRows}
                    </div>
                )}
                {!loading && !error && data?.length === 0 && <p>No stations found.</p>}
            </MainContent>
        </Layout>
    );
}

export default ListStations;
