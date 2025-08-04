import { MdAddLocation, MdLogout, MdOutlineEditLocation } from 'react-icons/md';
import { BsDatabaseAdd } from 'react-icons/bs';
import { TbDashboard, TbDatabaseEdit } from 'react-icons/tb';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function AdminNav() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={'card flex-col w-24 gap-y-8'}>
            <button className={'flex w-full justify-center transparent h-12'} data-title={'Go to dashboard'}>
                <TbDashboard className={'w-full h-full'} />
            </button>
            <button className={'flex w-full justify-center transparent h-12'} data-title={'Add new station'}>
                <MdAddLocation className={'w-full h-full'} />
            </button>
            <button className={'flex w-full justify-center transparent h-12'} data-title={'View all stations'}>
                <MdOutlineEditLocation className={'w-full h-full'} />
            </button>
            <button className={'flex w-full justify-center transparent h-12'} data-title={'Add new datasource'}>
                <BsDatabaseAdd className={'w-full h-full'} />
            </button>
            <button className={'flex w-full justify-center transparent h-12'} data-title={'View all datasources'}>
                <TbDatabaseEdit className={'w-full h-full'} />
            </button>
            <button className={'flex w-full justify-center transparent h-12'} data-title={'Logout'}>
                <MdLogout className={'w-full h-full'} onClick={handleLogout} />
            </button>
        </nav>
    );
}

export default AdminNav;
