import React from 'react';

const MainContent = React.memo(function MainContent({ loading, error, children }) {
    return (
        <main className="h-full overflow-auto pr-8">
            {loading &&  <p className={'loading'}>Loading...</p>}
            {error &&  <p className={'error'}>Error: {error}</p>}
            {children}
        </main>
    );
});

export default MainContent;
