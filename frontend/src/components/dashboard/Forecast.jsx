import { CiTempHigh } from 'react-icons/ci';
import { BsWind } from 'react-icons/bs';
import { MdOutlineVisibility, MdOutlineWaterDrop } from 'react-icons/md';

function Forecast({ ds }) {
    const { observation } = ds;
    const forecast = observation.forecast.forecastday[0];

    return (
        <>
            <div className="mb-4 font-medium">
                <h3 className="text-xl">Today's Forecast</h3>
            </div>
            <div className="grid grid-cols-4 gap-3 auto-rows-[140px]">
                <div className="card order-1 p-sm col-span-4 sm:col-span-1 row-span-1 flex flex-col">
                    <div className="flex flex-row items-center justify-center font-medium">
                        <CiTempHigh className="mr-1" />
                        <h4>Temp</h4>
                    </div>
                    <div className="grow flex flex-row justify-center pt-6">
                        <span className="text-3xl font-medium">{forecast.day.maxtemp_f}&deg;&nbsp;/&nbsp;</span>
                        <span className="text-xl align-bottom mt-2">{forecast.day.mintemp_f}&deg;F</span>
                    </div>
                </div>
                <div className="card p-sm order-2 col-span-4 sm:col-span-1 row-span-1 flex flex-col">
                    <div className="mb-1 flex flex-row items-center justify-center font-medium">
                        <BsWind className="mr-2" />
                        <h4>Wind</h4>
                    </div>
                    <div className="grow flex flex-row justify-center pt-6">
                        <span className="text-3xl font-medium">{forecast.day.maxwind_mph}&nbsp;mph</span>
                    </div>
                </div>
                <div className="card p-sm order-5 sm:order-3 col-span-4 sm:col-span-2 row-span-1 flex flex-row justify-between items-center">
                    <div className="pl-4">
                        <img className="w-16 h-16" src="../../src/assets/img/sunrise.png" />
                    </div>
                    <div className="flex flex-col gap-x-1 font-medium pr-4">
                        <span>Sunrise</span>
                        <span className="text-3xl">{forecast.astro.sunrise}</span>
                    </div>
                </div>
                <div className="card p-sm order-3 sm:order-4 col-span-4 sm:col-span-1 row-span-1 flex flex-col">
                    <div className="mb-1 flex flex-row items-center justify-center font-medium">
                        <MdOutlineWaterDrop className="mr-2" />
                        <h4>Humidity</h4>
                    </div>
                    <div className="grow flex flex-row justify-center pt-6">
                        <span className="text-3xl font-medium">{forecast.day.avghumidity}&nbsp;%</span>
                    </div>
                </div>
                <div className="card p-sm order-4 sm:order-5 col-span-4 sm:col-span-1 row-span-1 flex flex-col">
                    <div className="mb-1 flex flex-row items-center justify-center font-medium">
                        <MdOutlineVisibility className="mr-2" />
                        <h4>Visibility</h4>
                    </div>
                    <div className="grow flex flex-row justify-center pt-6">
                        <span className="text-3xl font-medium">{forecast.day.avgvis_miles}&nbsp;mi</span>
                    </div>
                </div>
                <div className="card p-sm order-6 col-span-4 sm:col-span-2 row-span-1 flex flex-row justify-between items-center">
                    <div className="pl-4">
                        <img className="w-16 h-16" src="../../src/assets/img/sunset.png" />
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
