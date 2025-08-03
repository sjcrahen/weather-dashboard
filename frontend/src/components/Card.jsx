function Card({ children, classes }) {
    return <div className={`card rounded-xl p-8 flex flex-col ${classes}`}>{children}</div>;
}

export default Card;
