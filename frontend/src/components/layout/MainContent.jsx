function MainContent({ data, loading, error, children }) {
    return (
        <main className={'h-full flex overflow-hidden'}>
            <div className={'card flex-col flex-1 overflow-auto'}>
                {loading && !data && <p className={'loading'}>Loading...</p>}
                {error && !data && <p className={'error'}>Error: {error}</p>}
                {children}
            </div>
        </main>
    );
}

export default MainContent;
