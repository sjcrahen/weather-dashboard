import React from 'react';

const WindyEmbed = React.memo(function WindyEmbed({ lat, long }) {
    const src = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=kt&zoom=8&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${long}&message=true`;
    return <iframe width="1280" height="528" src={src}></iframe>;
});

export default WindyEmbed;
