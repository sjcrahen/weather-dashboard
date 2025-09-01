import React, { useEffect, useRef } from "react";
import { parse, format } from "date-fns";
import { nowInTimeZone } from '../../utils/functions.js';

const CurrentPredictions = React.memo(function CurrentPredictions({ station, ds }) {
    const targetRef = useRef(null);
    let predictions = ds?.observation?.current_predictions?.cp;
    let lastBeforeNow = null;
    if (predictions) {
        predictions.forEach(p => p["dateTime"] = parse(p["Time"], "yyyy-MM-dd HH:mm", new Date()));
        const now = nowInTimeZone(station.timezone);
        lastBeforeNow = predictions.findLastIndex(p => p.dateTime <= now);
    }

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, []);

    const renderedCurrentPredictions = predictions?.map((p, idx) => {
        if (idx < 12) {
            const date = format(p.dateTime, "ddMMM HH:mm");
            let type = p.Type.charAt(0).toUpperCase() + p.Type.slice(1);
            if (type === "Slack") {
                type += idx < 11
                    ? (predictions[idx+1].Type.includes("lood") ? " Low" : " High")
                    : (predictions[idx-1].Type.includes("lood") ? " High" : " Low");
            } else {
                type = "Max " + type;
            }
            return (
                <div className="flex flex-row border-bottom" ref={idx === lastBeforeNow ? targetRef : null} key={p.dateTime}>
                    <span className="w-1/3">{date}</span>
                    <span className="w-1/3 flex flex-row justify-end">{type}</span>
                    <span className="w-1/3 flex flex-row justify-end">{`${parseFloat(p.Velocity_Major).toFixed(1)} kts`}</span>
                </div>
            );
        } else return null;
    });

    return (
        <div className="overflow-auto pr-2 current-predictions">
            <div className="flex flex-row border-bottom font-medium sticky top-0">
                <span className="w-1/3">Datetime</span>
                <span className="w-1/3 flex flex-row justify-end">Event</span>
                <span className="w-1/3 flex flex-row justify-end">Velocity</span>
            </div>
            {renderedCurrentPredictions}
        </div>
    );
});

export default CurrentPredictions;
