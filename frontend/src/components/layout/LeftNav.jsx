import { MdAddLocation, MdLocationOn, MdLogout } from 'react-icons/md';
import { BsDatabase, BsDatabaseAdd } from 'react-icons/bs';
import { TbDashboard } from 'react-icons/tb';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import TooltipWrapper from '../TooltipWrapper.jsx';

function LeftNav() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={'card flex-col w-24 gap-y-8'}>
            <TooltipWrapper title="Go to dashboard">
                <button className={'flex w-full justify-center transparent h-12'} onClick={() => navigate('/dashboard')}>
                    <TbDashboard className={'w-full h-full'} />
                </button>
            </TooltipWrapper>
            <TooltipWrapper title="View all stations">
                <button className={'flex w-full justify-center transparent h-12'} onClick={() => navigate('/admin/stations')}>
                    <MdLocationOn className={'w-full h-full'} />
                </button>
            </TooltipWrapper>
            <TooltipWrapper title="Add new station">
                <button className={'flex w-full justify-center transparent h-12'} onClick={() => navigate('/admin/stations/new')}>
                    <MdAddLocation className={'w-full h-full'} />
                </button>
            </TooltipWrapper>
            <TooltipWrapper title="View all datasources">
                <button className={'flex w-full justify-center transparent h-12'} onClick={() => navigate('/admin/datasources')}>
                    <BsDatabase className={'w-full h-full'} />
                </button>
            </TooltipWrapper>
            <TooltipWrapper title="Add new datasource">
                <button className={'flex w-full justify-center transparent h-12'} onClick={() => navigate('/admin/datasources/new')}>
                    <BsDatabaseAdd className={'w-full h-full'} />
                </button>
            </TooltipWrapper>
            <TooltipWrapper title="Logout">
                <button className={'flex w-full justify-center transparent h-12'} onClick={handleLogout}>
                    <MdLogout className={'w-full h-full'} />
                </button>
            </TooltipWrapper>
        </nav>
    );
}

export default LeftNav;
