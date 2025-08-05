import Layout from '../components/Layout.jsx';
import MainContent from '../components/MainContent.jsx';
import { useState } from 'react';
import Header from '../components/Header.jsx';

function Dashboard() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <Layout>
            <Header label={'Dashboard'} />
            <MainContent loading={loading} error={error}>
                {!loading && !error && data.length && <div>This is the dashboard!</div>}
                {!loading && !error && data.length === 0 && <p>No data found.</p>}
            </MainContent>
        </Layout>
    );
}

export default Dashboard;
