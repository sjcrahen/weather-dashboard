import { useAuth } from '../../contexts/AuthContext.jsx';
import LeftNav from './LeftNav.jsx';

function Layout({ children }) {
    const { isAuthenticated } = useAuth();

    return (
        <div className={'h-screen flex flex-row p-8 pr-0 gap-x-8'}>
            {isAuthenticated && <LeftNav />}
            <section className={'w-full flex flex-col gap-y-4'}>{children}</section>
        </div>
    );
}

export default Layout;
