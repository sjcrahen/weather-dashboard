function MainContent({ loading, error, children }) {
    return (
        <main className={'h-full flex overflow-hidden'}>
            <div className={'card flex-col flex-1 overflow-auto'}>
                {loading && <p className={'loading'}>Loading...</p>}
                {error && <p className={'error'}>Error: {error}</p>}
                {children}
            </div>
        </main>
    );
}

export default MainContent;
