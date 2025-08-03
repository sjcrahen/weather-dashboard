import { useParams } from 'react-router-dom';

function EditStation() {
    const { slug } = useParams();
    return <div>This is the page for {slug}</div>;
}

export default EditStation;
