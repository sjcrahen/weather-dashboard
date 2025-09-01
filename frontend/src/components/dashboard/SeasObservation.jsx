import React from 'react';
import { PiWaves } from 'react-icons/pi';
import TooltipWrapper from '../TooltipWrapper.jsx';
import { BsArrowDownCircle } from 'react-icons/bs';

const SeasObservation = React.memo(function SeasObservation({ ds }) {
    const { name, sourceIdentifier } = ds;
    const { dateTimeString, expired, waveHeight, dominantPeriod, waveDirection } = ds.observation;

    return (
        <a href={`https://www.ndbc.noaa.gov/station_page.php?station=${sourceIdentifier}`} target="_blank">
            <TooltipWrapper title="Click to view NDBC site">
                <div className="dashboard seas-observation card p-sm flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <PiWaves className="text-2xl mr-2" />
                        <h3 className="text-md overflow-hidden whitespace-nowrap max-w-12 min-[540px]:max-w-96">
                            {sourceIdentifier} - {name}
                        </h3>
                    </div>
                    {expired && <div className="flex flex-row items-center text-xl">No recent observations</div>}
                    {!expired && dateTimeString != null && waveHeight != null && (
                        <div className="flex flex-row gap-x-5 items-center">
                            <div className="flex flex-row gap-x-3 items-baseline text-xl font-medium">
                                <span>{waveHeight}ft</span>
                                {dominantPeriod != null && <span>{dominantPeriod}s</span>}
                            </div>
                            {waveDirection != null && (
                                <TooltipWrapper title={`${waveDirection}\u00b0T`}>
                                    <span className="rotatable-content">
                                        <BsArrowDownCircle className="text-3xl" style={{ transform: `rotate(${waveDirection}deg)` }} />
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

export default SeasObservation;
