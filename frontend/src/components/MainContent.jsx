function MainContent({ children }) {
    return (
        <main className={'h-full flex overflow-hidden'}>
            <div className={'card flex-col flex-1 overflow-auto'}>{children}</div>
        </main>
    );
}

export default MainContent;
