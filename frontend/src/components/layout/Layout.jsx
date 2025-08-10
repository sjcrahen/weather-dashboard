import { useAuth } from '../../contexts/AuthContext.jsx';
import LeftMenu from './LeftMenu.jsx';

function Layout({ children }) {
    const { isAuthenticated } = useAuth();

    return (
        <div className={'h-screen flex flex-row p-8 gap-x-4'}>
            {isAuthenticated && <LeftMenu />}
            <section className={'w-full flex flex-col gap-y-4'}>{children}</section>
        </div>
    );
}

export default Layout;
