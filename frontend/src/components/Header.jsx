import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Header({ label }) {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const isDarkTheme = localStorage.getItem('theme') != null;

    if (isDarkTheme) document.body.classList.add('dark-theme');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleDarkTheme = () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    };

    return (
        <header className={'flex flex-row justify-between w-full items-baseline'}>
            <h1 className={'text-4xl font-medium'}>{label}</h1>
            <div className={'flex flex-row gap-10'}>
                <label className="theme-toggle flex items-center gap-1 relative">
                    Light
                    <input
                        checked={isDarkTheme}
                        onChange={toggleDarkTheme}
                        type="checkbox"
                        className="appearance-none p-0 peer absolute left-0 top-0 rounded-md w-full h-full bg-transparent"
                    />
                    <span className="z-10 w-10 h-6 flex items-center flex-shrink-0 p-1 rounded-full duration-300 ease-in-out after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
                    Dark
                </label>
                {isAuthenticated && (
                    <button className={'link p-0 hover:underline'} onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
