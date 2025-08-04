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
            {loading && <p className={'loading'}>Loading...</p>}
            {error && <p className={'error'}>Error: {error}</p>}
            {!loading && !error && data.length && (
                <MainContent>
                    <div>This is the dashboard!</div>
                </MainContent>
            )}
            {!loading && !error && data.length === 0 && <p>No data found.</p>}
        </Layout>
    );
}

export default Dashboard;
