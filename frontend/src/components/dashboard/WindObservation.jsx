import { FaArrowPointer } from 'react-icons/fa6';
import { BsWind } from 'react-icons/bs';

function WindObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, windSpeed, windGust, windDirection } = ds.observation;

    return (
        <>
            <div className="text-3xl mb-1 font-medium flex flex-row items-center">
                <BsWind className="mr-2 text-2xl" />
                <h3 className="text-xl">
                    {sourceIdentifier} - {name}
                </h3>
            </div>
            <div className="text-sm">Updated: {expired ? 'No Recent Data' : dateTimeString + 'Z'}</div>
            <div className="flex flex-row pt-12 pb-4">
                <span className="text-7xl flex-1 flex flex-row items-center justify-center font-medium">{expired || windSpeed == null ? '---' : windSpeed}</span>
                <span className="flex-1 rotatable-content">
                    {!expired && windDirection != null && <FaArrowPointer className="text-7xl" style={{ transform: `translate(-50%,-50%) rotate(${windDirection - 160}deg)` }} />}
                </span>
                <span className="text-7xl flex-1 flex flex-row items-center justify-center font-medium">{expired || windGust == null || windGust <= 0 ? '---' : windGust}</span>
            </div>
            <div className="flex flex-row pb-12">
                <span className="text-2xl flex-1 flex flex-row justify-center">kts</span>
                <span className="flex-1 flex flex-row justify-center">{!expired && windDirection != null && <span className="text-2xl">{windDirection}</span>}</span>
                <span className="text-2xl flex-1 flex flex-row justify-center">gust</span>
            </div>
        </>
    );
}

export default WindObservation;
