import React from 'react';

function WindyEmbed({ station }) {
    const src = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=kt&zoom=8&overlay=wind&product=ecmwf&level=surface&lat=${station.latitude}&lon=${station.longitude}&message=true`;
    return (
        <>
            <iframe width="1280" height="528" src={src}></iframe>
        </>
    );
}

export default WindyEmbed;
