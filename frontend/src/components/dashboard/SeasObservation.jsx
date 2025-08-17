import { FaLocationArrow } from 'react-icons/fa';
import { PiWaves } from 'react-icons/pi';

function SeasObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, waveHeight, dominantPeriod, waveDirection } = ds.observation;

    return (
        <>
            <div className="mb-1 font-medium flex flex-row items-center">
                <PiWaves className="mr-2 text-3xl" />
                <h3 className="text-xl">
                    {sourceIdentifier} - {name}
                </h3>
            </div>
            <div className="text-sm">Updated: {expired ? 'No Recent Data' : dateTimeString + 'Z'}</div>
            <div className="flex flex-row pt-12 pb-4">
                <span className="text-7xl flex-1 flex flex-row items-center justify-center font-medium">{expired || dateTimeString == null ? '---' : waveHeight}</span>
                <span className="flex-1 rotatable-content">
                    {!expired && waveDirection != null && <FaLocationArrow className="text-6xl" style={{ transform: `translate(-50%,-50%) rotate(${waveDirection - 225}deg)` }} />}
                </span>
                <span className="text-7xl flex-1 flex flex-row items-center justify-center font-medium">{expired || dateTimeString == null ? '---' : dominantPeriod}</span>
            </div>
            <div className="flex flex-row pb-12">
                <span className="text-2xl flex-1 flex flex-row justify-center">ft</span>
                <span className="flex-1 flex flex-row justify-center">{!expired && waveDirection != null && <span className="text-2xl">{waveDirection}</span>}</span>
                <span className="text-2xl flex-1 flex flex-row justify-center">sec</span>
            </div>
        </>
    );
}

export default SeasObservation;
