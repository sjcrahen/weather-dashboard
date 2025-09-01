import { CiTempHigh } from 'react-icons/ci';
import { BsDropletHalf, BsWind } from 'react-icons/bs';
import { WiBarometer } from 'react-icons/wi';
import { MdOutlineVisibility } from 'react-icons/md';
import { PiSun } from 'react-icons/pi';
import React from 'react';

const CurrentWeather = React.memo(function CurrentWeather({ ds }) {
    const { observation } = ds;
    const forecast = observation.forecast.forecastday[0];
    return (
        <div className="h-48 flex flex-row w-full gap-4 flex-wrap max-w-full">
            <div className="dashboard wind-observation card flex flex-col grow min-w-48 min-[474px]:max-w-64">
                <div className="flex flex-row w-full justify-center">
                    <div className="grow flex flex-col items-center justify-center">
                        <img className="w-24" alt={observation.current.condition.text} src={observation.current.condition.icon} />
                        <span className="text-xl">{observation.current.condition.text}</span>
                    </div>
                </div>
            </div>
            <div className="dashboard wind-observation card flex flex-col grow min-w-48 min-[474px]:max-w-64">
                <div className="flex flex-row items-center justify-center text-lg font-medium gap-2">
                    <CiTempHigh className="text-xl" />
                    <h4>Temperature</h4>
                </div>
                <div className="flex justify-center mt-5 text-3xl font-medium">{observation.current.temp_f}&deg;F</div>
                <div className="text-xl flex justify-center mt-4 gap-3">
                    <span>Hi/Lo:</span>
                    <span className="">
                        {forecast.day.maxtemp_f}&deg;/{forecast.day.mintemp_f}&deg;
                    </span>
                </div>
            </div>
            <div className="dashboard wind-observation card flex flex-col grow min-w-48 min-[474px]:max-w-64">
                <div className="flex flex-row items-center justify-center text-lg font-medium gap-2">
                    <BsWind className="text-md" />
                    <h4>Wind</h4>
                </div>
                <div className="text-3xl font-medium flex justify-center mt-5">{observation.current.wind_mph}&nbsp;mph</div>
                <div className="text-xl flex justify-center mt-4 gap-3">{observation.current.wind_dir}</div>
            </div>
            <div className="dashboard wind-observation card flex flex-col grow min-w-48 min-[474px]:max-w-64">
                <div className="flex flex-row items-center justify-center text-lg font-medium gap-2">
                    <WiBarometer className="text-3xl" />
                    <h4>Pressure</h4>
                </div>
                <div className="text-3xl font-medium flex justify-center mt-9">{observation.current.pressure_mb}&nbsp;mb</div>
            </div>
            <div className="dashboard wind-observation card flex flex-col grow min-w-48 min-[474px]:max-w-64">
                <div className="flex flex-row items-center justify-center text-lg font-medium gap-2">
                    <BsDropletHalf />
                    <h4>Humidity</h4>
                </div>
                <div className="text-3xl font-medium flex justify-center mt-9">{observation.current.humidity}%</div>
            </div>
            <div className="dashboard wind-observation card flex flex-col grow min-w-48 min-[474px]:max-w-64">
                <div className="flex flex-row items-center justify-center text-lg font-medium gap-2">
                    <MdOutlineVisibility className="text-xl" />
                    <h4>Visibility</h4>
                </div>
                <div className="grow flex flex-row justify-center items-center">
                    <span className="text-3xl font-medium">{forecast.day.avgvis_miles}&nbsp;mi</span>
                </div>
            </div>
            <div className="dashboard wind-observation card flex flex-col grow min-w-48 min-[474px]:max-w-64">
                <div className="flex flex-row items-center justify-center text-lg font-medium gap-2">
                    <PiSun className="text-xl" />
                    <h4>Astro</h4>
                </div>
                <div className="flex flex-row justify-between pl-2 pr-2 mt-6">
                    <div>
                        <img className="w-8 h-8" src="../../src/assets/img/sunrise.png" />
                    </div>
                    <div className="flex flex-col gap-x-1 font-medium">
                        <span className="text-lg">{forecast.astro.sunrise}</span>
                    </div>
                </div>
                <div className="flex flex-row justify-between pl-2 pr-2 mt-4">
                    <div>
                        <img className="w-8 h-8" src="../../src/assets/img/sunset.png" />
                    </div>
                    <div className="flex flex-col gap-x-1 font-medium">
                        <span className="text-lg">{forecast.astro.sunset}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CurrentWeather;
