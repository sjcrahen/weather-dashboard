import { FaLocationArrow } from 'react-icons/fa';
import { PiWaves } from 'react-icons/pi';

function SeasObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, waveHeight, dominantPeriod, waveDirection } = ds.observation;

    return (
        <div className="dashboard seas-observation card flex flex-row justify-between">
            <div className="flex flex-row items-center">
                <PiWaves className="text-3xl mr-2" />
                <h3 className="text-xl">
                    {sourceIdentifier} - {name}
                </h3>
            </div>
            {expired && <div className="flex flex-row items-center text-xl">No recent observations</div>}
            {!expired && dateTimeString != null && waveHeight != null && (
                <div className="flex flex-row gap-x-5 items-center">
                    {waveDirection != null && (
                        <span className="rotatable-content">
                            <FaLocationArrow className="text-2xl" style={{ transform: `translate(-50%,-50%) rotate(${waveDirection - 225}deg)` }} />
                        </span>
                    )}
                    <div className="flex flex-row gap-x-3 items-baseline text-2xl">
                        <span className="font-medium text-3xl">{waveHeight}</span>
                        {dominantPeriod == null && <span className="text-xl">ft</span>}
                        {dominantPeriod != null && (
                            <>
                                <span className="text-xl">ft</span>
                                <span className="text-xl">@</span>
                                <span className="text-xl">{dominantPeriod}s</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SeasObservation;
