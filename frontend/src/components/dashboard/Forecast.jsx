import { CiTempHigh } from 'react-icons/ci';
import { BsWind } from 'react-icons/bs';
import { MdOutlineVisibility } from 'react-icons/md';

function Forecast({ ds }) {
    const { observation } = ds;
    const forecast = observation.forecast.forecastday[0];

    return (
        <>
            <div className="mb-4 flex flex-row items-baseline gap-x-2">
                <h3 className="text-xl font-medium">Today's Forecast</h3>
                <span className="text-md">- {ds.name}</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-3 auto-rows-[38px]">
                <div className="card order-1 p-sm col-span-3 sm:col-span-1 row-span-3 flex flex-col">
                    <div className="flex flex-row items-center justify-center font-medium">
                        <CiTempHigh className="mr-1" />
                        <h4>Temp</h4>
                    </div>
                    <div className="grow flex flex-row justify-center items-center">
                        <span className="text-3xl font-medium">{forecast.day.maxtemp_f}&deg;&nbsp;/&nbsp;</span>
                        <span className="text-xl align-bottom mt-2">{forecast.day.mintemp_f}&deg;F</span>
                    </div>
                </div>
                <div className="card p-sm order-2 col-span-3 sm:col-span-1 row-span-3 flex flex-col justify-stretch">
                    <div className="flex flex-row items-center justify-center font-medium">
                        <BsWind className="mr-2" />
                        <h4>Wind</h4>
                    </div>
                    <div className="grow flex flex-row justify-center items-center">
                        <span className="text-3xl font-medium">{forecast.day.maxwind_mph}&nbsp;mph</span>
                    </div>
                </div>
                <div className="card p-sm order-4 col-span-3 sm:col-span-1 md:hidden lg:col-span-1 xl:hidden 2xl:col-span-1 row-span-3 flex flex-col">
                    <div className="flex flex-row items-center justify-center font-medium">
                        <MdOutlineVisibility className="mr-2" />
                        <h4>Visibility</h4>
                    </div>
                    <div className="grow flex flex-row justify-center items-center">
                        <span className="text-3xl font-medium">{forecast.day.avgvis_miles}&nbsp;mi</span>
                    </div>
                </div>
                <div className="card p-sm order-5 col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2 2xl:col-span-3 row-span-2 flex flex-row justify-between items-center">
                    <div className="pl-4">
                        <img className="w-14 h-14" src="../../src/assets/img/sunrise.png" />
                    </div>
                    <div className="flex flex-col gap-x-1 font-medium pr-4">
                        <span>Sunrise</span>
                        <span className="text-3xl">{forecast.astro.sunrise}</span>
                    </div>
                </div>
                <div className="card p-sm order-6 col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2 2xl:col-span-3 row-span-2 flex flex-row justify-between items-center">
                    <div className="pl-4">
                        <img className="w-14 h-14" src="../../src/assets/img/sunset.png" />
                    </div>
                    <div className="flex flex-col gap-x-1 font-medium pr-4">
                        <span>Sunset</span>
                        <span className="text-3xl">{forecast.astro.sunset}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forecast;
