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
import CurrentPredictions from '../components/dashboard/CurrentPredictions.jsx';

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
        .map((ds, idx) => {
            if (idx < 3) {
                return (
                    <React.Fragment key={ds.id}>
                        {ds.type === 'SEAS' && <SeasObservation ds={ds} />}
                        {ds.type === 'WIND' && <WindObservation ds={ds} />}
                    </React.Fragment>
                );
            } else return null;
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

    const renderedCurrentPredictions = dataSources
        ?.filter(ds => ds.observation != null && ds.type === 'CURRENT')
        .map(ds => {
            return <React.Fragment key={ds.id}>{ds.type === 'CURRENT' && <CurrentPredictions station={data} ds={ds} />}</React.Fragment>;
        });


    return (
        <Layout>
            <PageHeader label={headerLabel || 'Dashboard'} />
            <MainContent data={data} loading={loading} error={error}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 w-full">
                        <div className="flex flex-col gap-y-4 col-span-6 grow max-w-5xl">
                            <div className="flex flex-row gap-4 w-full">
                                <div className="dashboard ndbc-observation card flex flex-col gap-y-3 grow h-56">
                                    {!loading && !error && dataSources?.length > 0 && renderedNdbcObservations}
                                </div>
                                {dataSources?.filter(ds => ds.observation != null && ds.type === 'CURRENT').length>0 &&
                                    <div className="dashboard card grow flex flex-col gap-y-3 h-56">
                                        {!loading && !error && dataSources?.length > 0 && renderedCurrentPredictions}
                                    </div>
                                }
                            </div>
                            <div className="dashboard card flex flex-col h-72 max-w-5xl">{!loading && !error && dataSources?.length > 0 && renderedTideChart}</div>
                        </div>
                        <div className="card no-pad radar grow">{!loading && !error && data && <WindyEmbed station={data} />}</div>
                        {!loading && !error && dataSources?.length === 0 && <p>No data found.</p>}
                    </div>
                    <div className="flex flex-row gap-x-4 w-full">
                        {!loading && !error && dataSources?.length > 0 && renderedWeatherObservations}
                    </div>
                </div>
            </MainContent>
        </Layout>
    );
}

export default Dashboard;
