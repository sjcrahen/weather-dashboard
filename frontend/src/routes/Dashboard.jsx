import Layout from '../components/layout/Layout.jsx';
import MainContent from '../components/layout/MainContent.jsx';
import React, { useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.jsx';
import SeasObservation from '../components/dashboard/SeasObservation.jsx';
import WindObservation from '../components/dashboard/WindObservation.jsx';
import { titleCase } from '../utils/functions.js';

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
                    {ds.observation.type === 'SEAS' && (
                        <div className="dashboard card flex flex-col w-96">
                            <SeasObservation ds={ds} />
                        </div>
                    )}
                    {ds.observation.type === 'WIND' && (
                        <div className="dashboard card flex flex-col w-96">
                            <WindObservation ds={ds} />
                        </div>
                    )}
                </React.Fragment>
            );
        });

    return (
        <Layout>
            <PageHeader label={headerLabel || 'Dashboard'} />
            <MainContent data={data} loading={loading} error={error}>
                <div className="flex flex-row flex-wrap gap-4">
                    {!loading && !error && data?.length > 0 && renderedObservations}
                    {!loading && !error && data?.length === 0 && <p>No data found.</p>}
                </div>
            </MainContent>
        </Layout>
    );
}

export default Dashboard;
