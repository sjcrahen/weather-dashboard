import Header from './Header.jsx';

function DashboardLayout({ children }) {
    return (
        <div className={'h-screen flex flex-row p-8 gap-x-4'}>
            <section className={'w-full flex flex-col gap-y-4'}>
                <Header label={'Dashboard'} />
                {children}
            </section>
        </div>
    );
}

export default DashboardLayout;
