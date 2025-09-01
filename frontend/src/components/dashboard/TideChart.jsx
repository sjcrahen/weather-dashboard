import React, { useMemo, useRef } from 'react';
import { CartesianGrid, Label, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';
import dayjs from 'dayjs';
import { nowInTimeZone } from '../../utils/functions.js';

const TideChart = React.memo(function TideChart({ station, ds }) {
    const now = nowInTimeZone(station.timezone);

    // Your dataset is already extrema points
    const parsed = useMemo(
        () =>
            ds.observation.predictions?.map((d) => ({
                time: parseISO(d.t.replace(' ', 'T')),
                Height: parseFloat(d.v),
                type: d.type === 'H' ? 'max' : 'min',
            })) ?? [],
        [ds],
    );

    // Generate smooth tide curve between extrema
    function generateTideCurve(extrema, stepMinutes = 18) {
        if (extrema.length < 2) return [];

        const curve = [];
        for (let i = 0; i < extrema.length - 1; i++) {
            const p0 = extrema[i];
            const p1 = extrema[i + 1];

            const t0 = p0.time.getTime();
            const t1 = p1.time.getTime();
            const H0 = p0.Height;
            const H1 = p1.Height;

            const Hmid = (H0 + H1) / 2;
            const ΔH = H0 - H1;

            for (let t = t0; t <= t1; t += stepMinutes * 60 * 1000) {
                const phase = (Math.PI * (t - t0)) / (t1 - t0); // 0 → π
                const Ht = Hmid + (ΔH / 2) * Math.cos(phase);

                curve.push({ time: new Date(t), Height: Ht });
            }
        }
        return curve;
    }

    const curve = useMemo(() => generateTideCurve(parsed), [parsed]);

    // Compute ticks every 6h
    function getTicks() {
        if (!parsed.length) return [];

        const min = parsed[0].time.getTime();
        const max = parsed[parsed.length - 1].time.getTime();

        const ticks = [];
        let t = dayjs(min).startOf('hour');
        while (t.isBefore(max)) {
            ticks.push(t.valueOf());
            t = t.add(6, 'hour');
        }
        return ticks;
    }

    // Keep track of extrema dot coords for snapping tooltips
    const extremaCoords = useRef(new Map());

    const CustomTooltip = ({ active, label }) => {
        if (!active) return null;

        const nearest = parsed.reduce((prev, curr) => (Math.abs(curr.time.getTime() - label) < Math.abs(prev.time.getTime() - label) ? curr : prev));

        const coords = extremaCoords.current.get(nearest.time.getTime());
        if (!coords) return null;

        const tooltipWidth = 190;
        const container = document.querySelector('.recharts-wrapper');
        const containerRect = container?.getBoundingClientRect();
        let left = coords.cx;

        if (containerRect) {
            const minLeft = tooltipWidth / 2;
            const maxLeft = containerRect.width - tooltipWidth / 2;
            if (left < minLeft) left = minLeft;
            if (left > maxLeft) left = maxLeft;
        }

        return (
            <div
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: `${left}px`,
                    top: `${coords.cy + (nearest.type === 'max' ? 70 : -10)}px`,
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    padding: '4px 8px',
                    border: '1px solid var(--card-2)',
                    borderRadius: '8px',
                    boxShadow: '1px 1px 3px #222',
                    transform: 'translate(-50%, -100%)',
                    whiteSpace: 'nowrap',
                }}
            >
                <div className="text-sm">{`${format(nearest.time, 'd MMM HH:mm')} (LST/LDT)`}</div>
                <div className="text-lg">
                    {nearest.type === 'max' ? 'High' : 'Low'}: <span className="font-medium">{nearest.Height.toFixed(2)} ft</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="mb-1 flex flex-row items-baseline gap-x-2">
                <h3 className="text-xl font-medium">Tide Predictions</h3>
                <span>- {ds.name}</span>
            </div>

            {parsed.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={curve} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid stroke="var(--card-3)" strokeDasharray="3 3" />

                        <XAxis
                            dataKey="time"
                            type="number"
                            scale="time"
                            domain={[parsed[0].time.getTime(), parsed[parsed.length - 1].time.getTime()]}
                            ticks={getTicks()}
                            tickFormatter={(time) => format(time, 'HH:mm')}
                            tick={{ fill: 'var(--text)' }}
                            axisLine={{ stroke: 'var(--text)' }}
                            tickLine={{ stroke: 'var(--text)' }}
                        />

                        <YAxis
                            tick={{ fill: 'var(--text)' }}
                            axisLine={{ stroke: 'var(--text)' }}
                            tickLine={{ stroke: 'var(--text)' }}
                            label={{
                                value: 'Height in feet (MLLW)',
                                angle: -90,
                                position: 'insideLeft',
                                dy: 80,
                                style: { fill: 'var(--text)' },
                            }}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        {/* Tide curve */}
                        <Line dataKey="Height" stroke="var(--links)" strokeWidth={2} dot={false} activeDot={false} />

                        {/* Extrema points */}
                        <Line
                            data={parsed}
                            type="monotone"
                            dataKey="Height"
                            stroke="transparent"
                            dot={{ r: 5 }}
                            activeDot={({ cx, cy, payload }) => {
                                extremaCoords.current.set(payload.time.getTime(), { cx, cy });
                                return <circle cx={cx} cy={cy} r={8} fill="var(--links)" />;
                            }}
                        />

                        {parsed.map((point, idx) => (
                            <ReferenceDot key={idx} x={point.time.getTime()} y={point.Height} r={4} fill="var(--text)">
                                {idx > 0 && idx < parsed.length - 1 && (
                                    <Label value={point.Height.toFixed(2)} position={point.type === 'max' ? 'top' : 'bottom'} fill="var(--text)" fontSize={12} />
                                )}
                            </ReferenceDot>
                        ))}

                        <ReferenceLine
                            x={now.getTime()}
                            stroke="red"
                            strokeDasharray="3 3"
                            label={{
                                value: `${now.toLocaleTimeString('en-US', {
                                    hour12: false,
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })} (LST/LDT)`,
                                fill: 'red',
                                angle: 90,
                                dy: -35,
                                dx: 10,
                                style: { fontSize: 13 },
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </>
    );
});

export default TideChart;
