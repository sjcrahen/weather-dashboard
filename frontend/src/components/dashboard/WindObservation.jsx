import { BsArrowDownCircle, BsWind } from 'react-icons/bs';
import TooltipWrapper from '../TooltipWrapper.jsx';

function WindObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, windSpeed, windGust, windDirection } = ds.observation;

    return (
        <a href={`https://www.ndbc.noaa.gov/station_page.php?station=${sourceIdentifier}`} target="_blank">
            <TooltipWrapper title="Click to view NDBC site">
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
                            <div className="flex flex-row gap-x-3 items-baseline text-2xl font-medium">
                                <span>{windSpeed}kts</span>
                                {windGust != null && windGust > 0 && <span className="text-xl font-normal">(gst {windGust}kts)</span>}
                            </div>
                            {windDirection != null && (
                                <TooltipWrapper title={`${windDirection}\u00b0T`}>
                                    <span className="rotatable-content">
                                        <BsArrowDownCircle className="text-5xl" style={{ transform: `rotate(${windDirection}deg)` }} />
                                    </span>
                                </TooltipWrapper>
                            )}
                        </div>
                    )}
                </div>
            </TooltipWrapper>
        </a>
    );
}

export default WindObservation;
