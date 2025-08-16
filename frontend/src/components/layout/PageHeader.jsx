import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.jsx';
import { useNavigate, useParams } from 'react-router-dom';

function PageHeader({ label }) {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') != null);
    const { data, loading, error, doFetch } = useFetch();
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState('');

    useEffect(() => {
        const getStations = async () => {
            await doFetch('http://localhost:8080/api/dashboard/stations');
        };
        getStations();
    }, [doFetch, slug]);

    useEffect(() => {
        if (data) {
            setStations(data);
        }
    }, [data, slug]);

    useEffect(() => {
        if (isDarkTheme) {
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark-theme');
        } else {
            localStorage.removeItem('theme');
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    const toggleDarkTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const selectNewStation = (e) => {
        navigate(`/dashboard/${e.currentTarget.value}`);
    };

    return (
        <header className={'flex flex-row justify-between w-full items-baseline'}>
            <h1 className={'text-4xl font-medium'}>{label}</h1>
            <div className={'flex flex-row gap-10'}>
                <select className="w-72" value={selectedStation} name="datasource" onChange={selectNewStation}>
                    <option value="" disabled>
                        Select a station
                    </option>
                    {stations.map((station) => (
                        <option key={station.id} value={station.slug}>
                            {station.name}
                        </option>
                    ))}
                </select>
                <label className="theme-toggle flex items-center gap-1 relative">
                    Light
                    <input
                        checked={isDarkTheme}
                        onChange={toggleDarkTheme}
                        type="checkbox"
                        className="appearance-none p-0 peer absolute left-0 top-0 rounded-md w-full h-full bg-transparent cursor-pointer"
                    />
                    <span className="cursor-pointer z-10 w-10 h-6 flex items-center flex-shrink-0 p-1 rounded-full duration-300 ease-in-out after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
                    Dark
                </label>
            </div>
        </header>
    );
}

export default PageHeader;
