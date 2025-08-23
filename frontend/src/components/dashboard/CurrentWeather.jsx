import { BsWind } from 'react-icons/bs';

function CurrentWeather({ ds }) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const { name, observation } = ds;
    const lastUpdated = new Date(observation.current.last_updated.replace(' ', 'T'));
    return (
        <div className="dashboard wind-observation card flex flex-col col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 sm:row-span-10">
            <div className="flex-row items-center gap-x-1">
                <h3 className="text-xl font-medium">Current Conditions</h3>
                <p className="">{observation.current.last_updated} (LST/LDT)</p>
            </div>
            <div className="flex flex-row w-full justify-center pt-12">
                <div className="grow flex flex-col items-center pt-4">
                    <img className="w-32" alt={observation.current.condition.text} src={observation.current.condition.icon} />
                </div>
                <div className="flex flex-col justify-between">
                    <span className="text-5xl mb-14 font-medium">{observation.current.temp_f}&deg;F</span>
                    <div className="flex flex-col">
                        <span className="text-xl">{observation.current.condition.text}</span>
                        <span className="text-sm">Feels like {observation.current.feelslike_f}&deg;</span>
                        <span className="text-sm flex flex-row gap-x-1.5 items-center">
                            Wind:&nbsp;{observation.current.wind_mph}&nbsp;mph
                            <BsWind className="" />
                            {observation.current.wind_dir}
                        </span>
                        <span className="text-sm">Pressure:&nbsp;{observation.current.pressure_mb}&nbsp;mb</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;
