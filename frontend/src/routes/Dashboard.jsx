import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import MainContent from '../components/layout/MainContent.jsx';
import useFetch from '../hooks/useFetch.jsx';

import SeasObservation from '../components/dashboard/SeasObservation.jsx';
import WindObservation from '../components/dashboard/WindObservation.jsx';
import CurrentWeather from '../components/dashboard/CurrentWeather.jsx';
import TideChart from '../components/dashboard/TideChart.jsx';
import Forecast from '../components/dashboard/Forecast.jsx';
import WindyEmbed from '../components/dashboard/WindyEmbed.jsx';
import CurrentPredictions from '../components/dashboard/CurrentPredictions.jsx';
import { titleCase } from '../utils/functions.js';

function Dashboard() {
    const { slug } = useParams();
    const { data, loading, error, doFetch } = useFetch();
    const [dataSources, setDataSources] = useState([]);
    const headerLabel = titleCase(slug);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/dashboard/${slug}`);
        const interval = setInterval(() => {
            doFetch(`http://localhost:8080/api/dashboard/${slug}`);
        }, 180_000);
        return () => clearInterval(interval);
    }, [slug, doFetch]);

    useEffect(() => {
        if (data?.dataSources) setDataSources(data.dataSources);
    }, [data]);

    const ndbcObservations = useMemo(
        () => dataSources.filter(ds => ds.observation && (ds.type === 'SEAS' || ds.type === 'WIND')).slice(0, 3),
        [dataSources]
    );

    const weatherObservations = useMemo(
        () => dataSources.filter(ds => ds.observation && ds.type === 'WEATHER'),
        [dataSources]
    );

    const tideCharts = useMemo(
        () => dataSources.filter(ds => ds.observation && ds.type === 'TIDE'),
        [dataSources]
    );

    const currentPredictions = useMemo(
        () => dataSources.filter(ds => ds.observation && ds.type === 'CURRENT'),
        [dataSources]
    );

    return (
        <Layout>
            <PageHeader label={headerLabel || 'Dashboard'} />
            <main className="h-full overflow-auto pr-8">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 w-full flex-wrap">
                        <div className="flex flex-col gap-y-4 grow w-full xl:max-w-4xl 3xl:max-w-5xl">
                            <div className="flex flex-row gap-4 w-full flex-wrap">
                                <div className="dashboard ndbc-observation card flex flex-col gap-y-3 grow h-56 w-full lg:w-fit">
                                    {ndbcObservations.map(ds =>
                                        ds.type === 'SEAS' ? (
                                            <SeasObservation key={ds.id} ds={ds} />
                                        ) : (
                                            <WindObservation key={ds.id} ds={ds} />
                                        )
                                    )}
                                </div>
                                {currentPredictions.length > 0 && (
                                    <div className="dashboard card grow flex flex-col gap-y-3 h-56 w-full lg:max-w-sm">
                                        {currentPredictions.map(ds => (
                                            <CurrentPredictions key={ds.id} station={data} ds={ds} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="dashboard card flex flex-col h-72 2xl:max-w-4xl 3xl:max-w-5xl">
                                {tideCharts.map(ds => (
                                    <TideChart key={ds.id} station={data} ds={ds} />
                                ))}
                            </div>
                        </div>
                        {data && (
                            <div className="card no-pad radar grow">
                                <WindyEmbed lat={data.latitude} long={data.longitude} />
                            </div>
                        )}
                        {!loading && !error && dataSources.length === 0 && <p>No data found.</p>}
                    </div>
                    <div className="flex flex-row gap-x-4 w-full flex-wrap">
                        {weatherObservations.map(ds => (
                            <CurrentWeather key={ds.id} ds={ds} />
                        ))}
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Dashboard;
