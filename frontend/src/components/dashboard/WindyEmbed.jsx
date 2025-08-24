import React from 'react';

function WindyEmbed({ station }) {
    const src = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=kt&zoom=8&overlay=wind&product=ecmwf&level=surface&lat=${station.latitude}&lon=${station.longitude}&message=true`;
    return (
        <div className="card no-pad radar col-span-12 xl:col-span-4 2xl:col-span-5 row-span-11">
            <iframe width="1280" height="424" src={src}></iframe>
        </div>
    );
}

export default WindyEmbed;
