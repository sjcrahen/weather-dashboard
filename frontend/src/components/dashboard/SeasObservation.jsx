import { FaLocationArrow } from 'react-icons/fa';
import { PiWaves } from 'react-icons/pi';

function SeasObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, waveHeight, dominantPeriod, waveDirection } = ds.observation;

    return (
        <>
            <h3 className="mb-1 font-medium flex flex-row items-center">
                <PiWaves className="mr-2 text-3xl" />
                <span className="text-xl">
                    {sourceIdentifier} - {name}
                </span>
            </h3>
            <div className="text-sm">Updated: {expired ? 'No Recent Data' : dateTimeString + 'Z'}</div>
            <div className="flex flex-row pt-12 pb-4">
                <div className="text-7xl flex-1 flex flex-row items-center justify-center font-medium">{expired || dateTimeString == null ? '---' : waveHeight}</div>
                <div className="flex-1 rotatable-content">
                    {!expired && waveDirection != null && <FaLocationArrow className="text-6xl" style={{ transform: `translate(-50%,-50%) rotate(${waveDirection - 225}deg)` }} />}
                </div>
                <div className="text-7xl flex-1 flex flex-row items-center justify-center font-medium">{expired || dateTimeString == null ? '---' : dominantPeriod}</div>
            </div>
            <div className="flex flex-row pb-12">
                <div className="text-2xl flex-1 flex flex-row justify-center">ft</div>
                <div className="flex-1 flex flex-row justify-center">{!expired && waveDirection != null && <span className="text-2xl">{waveDirection}</span>}</div>
                <div className="text-2xl flex-1 flex flex-row justify-center">sec</div>
            </div>
        </>
    );
}

export default SeasObservation;
