import Layout from '../components/layout/Layout.jsx';
import MainContent from '../components/layout/MainContent.jsx';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.jsx';
import SeasObservation from '../components/dashboard/SeasObservation.jsx';
import WindObservation from '../components/dashboard/WindObservation.jsx';
import { titleCase } from '../utils/functions.js';
import CurrentWeather from '../components/dashboard/CurrentWeather.jsx';
import TideChart from '../components/dashboard/TideChart.jsx';
import Forecast from '../components/dashboard/Forecast.jsx';
import WindyEmbed from '../components/dashboard/WindyEmbed.jsx';

function Dashboard() {
    const { slug } = useParams();
    const { data, loading, error, doFetch } = useFetch();
    const [dataSources, setDataSources] = useState();
    const headerLabel = titleCase(slug);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/dashboard/${slug}`);
    }, [slug, doFetch]);

    useEffect(() => {
        if (data) {
            setDataSources(data.dataSources);
        }
    }, [data]);

    const renderedNdbcObservations = dataSources
        ?.filter((ds) => ds.observation != null && (ds.type === 'SEAS' || ds.type === 'WIND'))
        .map((ds) => {
            return (
                <React.Fragment key={ds.id}>
                    {ds.type === 'SEAS' && <SeasObservation ds={ds} />}
                    {ds.type === 'WIND' && <WindObservation ds={ds} />}
                </React.Fragment>
            );
        });

    const renderedWeatherObservations = dataSources
        ?.filter((ds) => ds.observation != null && ds.type === 'WEATHER')
        .map((ds) => {
            return <React.Fragment key={ds.id}>{ds.type === 'WEATHER' && <CurrentWeather ds={ds} />}</React.Fragment>;
        });

    const renderedForecastObservations = dataSources
        ?.filter((ds) => ds.observation != null && ds.type === 'WEATHER')
        .map((ds) => {
            return <React.Fragment key={ds.id}>{ds.type === 'WEATHER' && <Forecast ds={ds} />}</React.Fragment>;
        });

    const renderedTideChart = dataSources
        ?.filter((ds) => ds.observation != null && ds.type === 'TIDE')
        .map((ds) => {
            return <React.Fragment key={ds.id}>{ds.type === 'TIDE' && <TideChart station={data} ds={ds} />}</React.Fragment>;
        });

    return (
        <Layout>
            <PageHeader label={headerLabel || 'Dashboard'} />
            <MainContent data={data} loading={loading} error={error}>
                <div className="grid grid-cols-12 gap-4 auto-rows-auto sm:auto-rows-[24px]">
                    {!loading && !error && dataSources?.length > 0 && renderedWeatherObservations}
                    {!loading && !error && dataSources?.length > 0 && renderedForecastObservations}
                    {!loading && !error && data && <WindyEmbed station={data} />}
                    <div className="dashboard ndbc-observation card flex flex-col col-span-12 xl:col-span-6 2xl:col-span-6 row-span-8 gap-y-3">
                        {!loading && !error && dataSources?.length > 0 && renderedNdbcObservations}
                    </div>
                    {!loading && !error && dataSources?.length > 0 && renderedTideChart}
                    {!loading && !error && dataSources?.length === 0 && <p>No data found.</p>}
                </div>
            </MainContent>
        </Layout>
    );
}

export default Dashboard;
