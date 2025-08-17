import { BsWind } from 'react-icons/bs';

function CurrentWeather({ ds }) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const { name, observation } = ds;
    const lastUpdated = new Date(observation.current.last_updated.replace(' ', 'T'));
    return (
        <>
            <div className="flex-row items-center gap-x-1 font-medium">
                <h3 className="text-xl">Current Conditions</h3>
            </div>
            <div className="flex flex-row w-full justify-center pt-8">
                <div className="grow flex flex-col items-center pt-4">
                    <img className="w-32" alt={observation.current.condition.text} src={observation.current.condition.icon} />
                </div>
                <div className="flex flex-col justify-between">
                    <span className="text-5xl mb-8 font-medium">{observation.current.temp_f}&deg;F</span>
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
        </>
    );
}

export default CurrentWeather;
