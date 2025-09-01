function MainContent({ data, loading, error, children }) {
    return (
        <main className="h-full overflow-auto pr-8">
            {loading && !data && <p className={'loading'}>Loading...</p>}
            {error && !data && <p className={'error'}>Error: {error}</p>}
            {children}
        </main>
    );
}

export default MainContent;
