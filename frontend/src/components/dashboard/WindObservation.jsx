import React from 'react';
import { BsArrowDownCircle, BsWind } from 'react-icons/bs';
import TooltipWrapper from '../TooltipWrapper.jsx';

const WindObservation = React.memo(function WindObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, windSpeed, windGust, windDirection } = ds.observation;

    return (
        <a href={`https://www.ndbc.noaa.gov/station_page.php?station=${sourceIdentifier}`} target="_blank">
            <TooltipWrapper title="Click to view NDBC site">
                <div className="dashboard card p-sm flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <BsWind className="text-xl mr-2" />
                        <h3 className="text-md overflow-hidden whitespace-nowrap max-w-12 min-[540px]:max-w-96">
                            {sourceIdentifier} - {name}
                        </h3>
                    </div>
                    {expired && <div className="flex flex-row items-center text-lg text-red-700">No recent observations</div>}
                    {!expired && windSpeed != null && (
                        <div className="flex flex-row gap-x-5 items-center">
                            <div className="flex flex-row gap-x-3 items-baseline text-xl font-medium">
                                <span>{windSpeed}kts</span>
                            </div>
                            {windDirection != null && (
                                <TooltipWrapper title={`${windDirection}\u00b0T`}>
                                    <span className="rotatable-content">
                                        <BsArrowDownCircle className="text-3xl" style={{ transform: `rotate(${windDirection}deg)` }} />
                                    </span>
                                </TooltipWrapper>
                            )}
                        </div>
                    )}
                </div>
            </TooltipWrapper>
        </a>
    );
});

export default WindObservation;
