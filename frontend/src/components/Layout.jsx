import { useAuth } from '../contexts/AuthContext.jsx';
import AdminNav from './AdminNav.jsx';

function Layout({ children }) {
    const { isAuthenticated } = useAuth();

    return (
        <div className={'h-screen flex flex-row p-8 gap-x-4'}>
            {isAuthenticated && <AdminNav />}
            <section className={'w-full flex flex-col gap-y-4'}>{children}</section>
        </div>
    );
}

export default Layout;
