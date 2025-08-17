import Layout from '../components/layout/Layout.jsx';
import MainContent from '../components/layout/MainContent.jsx';
import React, { useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.jsx';
import SeasObservation from '../components/dashboard/SeasObservation.jsx';
import WindObservation from '../components/dashboard/WindObservation.jsx';
import { titleCase } from '../utils/functions.js';
import CurrentWeather from '../components/dashboard/CurrentWeather.jsx';
import Forecast from '../components/dashboard/Forecast.jsx';

function Dashboard() {
    const { slug } = useParams();
    const { data, loading, error, doFetch } = useFetch();
    const headerLabel = titleCase(slug);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/dashboard/${slug}`);
    }, [slug, doFetch]);

    const renderedObservations = data
        ?.filter((ds) => ds.observation != null)
        .map((ds) => {
            return (
                <React.Fragment key={ds.id}>
                    {ds.type === 'SEAS' && (
                        <div className="dashboard card flex flex-col col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 sm:row-span-5">
                            <SeasObservation ds={ds} />
                        </div>
                    )}
                    {ds.type === 'WIND' && (
                        <div className="dashboard card flex flex-col col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 sm:row-span-5">
                            <WindObservation ds={ds} />
                        </div>
                    )}
                    {ds.type === 'WEATHER' && (
                        <div className="dashboard card flex flex-col col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 sm:row-span-5">
                            <CurrentWeather ds={ds} />
                        </div>
                    )}
                    {ds.type === 'WEATHER' && (
                        <div className="dashboard card flex flex-col col-span-12 lg:col-span-8 xl:col-span-6 2xl:col-span-5 sm:row-span-6">
                            <Forecast ds={ds} />
                        </div>
                    )}
                </React.Fragment>
            );
        });

    return (
        <Layout>
            <PageHeader label={headerLabel || 'Dashboard'} />
            <MainContent data={data} loading={loading} error={error}>
                <div className="grid grid-cols-12 gap-4 auto-rows-auto sm:auto-rows-[50px]">
                    {!loading && !error && data?.length > 0 && renderedObservations}
                    {!loading && !error && data?.length === 0 && <p>No data found.</p>}
                </div>
            </MainContent>
        </Layout>
    );
}

export default Dashboard;
