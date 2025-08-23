import { FaArrowPointer } from 'react-icons/fa6';
import { BsWind } from 'react-icons/bs';

function WindObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, windSpeed, windGust, windDirection } = ds.observation;

    return (
        <div className="dashboard card flex flex-row justify-between">
            <div className="flex flex-row items-center">
                <BsWind className="text-2xl mr-2" />
                <h3 className="text-xl">
                    {sourceIdentifier} - {name}
                </h3>
            </div>
            {expired && <div className="flex flex-row items-center text-xl">No recent observations</div>}
            {!expired && windSpeed != null && (
                <div className="flex flex-row gap-x-5 items-center">
                    {windDirection != null && (
                        <span className="rotatable-content">
                            <FaArrowPointer className="text-2xl" style={{ transform: `translate(-50%,-50%) rotate(${windDirection - 160}deg)` }} />
                        </span>
                    )}
                    <div className="flex flex-row gap-x-3 items-baseline text-2xl">
                        <span className="font-medium text-3xl">{windSpeed}</span>
                        <span className="text-xl">kts</span>
                        {windGust != null && windGust > 0 && <span className="">G{windGust}</span>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default WindObservation;
