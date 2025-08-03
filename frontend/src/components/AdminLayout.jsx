import AdminNav from './AdminNav.jsx';
import Header from './Header.jsx';

function AdminLayout({ children }) {
    return (
        <div className={'h-screen flex flex-row p-8 gap-x-4'}>
            <AdminNav />
            <section className={'w-full flex flex-col gap-y-4'}>
                <Header label={'Stations'} />
                {children}
            </section>
        </div>
    );
}

export default AdminLayout;
