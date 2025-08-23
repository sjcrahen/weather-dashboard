import { CartesianGrid, Label, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';
import dayjs from 'dayjs';

export default function TideChart({ ds }) {
    const data = ds.observation.predictions;
    const parsed = data?.map((d) => ({
        time: parseISO(d.t.replace(' ', 'T')), // parse to Date
        Height: parseFloat(d.v),
    }));
    const extrema = findLocalExtrema();
    const extremaCoords = new Map();

    function getTicks() {
        if (!parsed) return;
        const min = Math.min(...parsed.map((d) => d.time));
        const max = Math.max(...parsed.map((d) => d.time));
        const ticks = [];
        const start = dayjs(min).startOf('hour');
        for (let t = start; t.isBefore(max); t = t.add(6, 'hour')) {
            ticks.push(t.valueOf());
        }
        return ticks;
    }

    function findLocalExtrema() {
        const extrema = [];
        if (!parsed || parsed.length < 3) return extrema;

        let i = 1;
        while (i < parsed.length - 1) {
            const prev = parsed[i - 1].Height;
            const curr = parsed[i].Height;

            // Look ahead to handle plateaus
            let j = i;
            while (j + 1 < parsed.length && parsed[j + 1].Height === curr) j++;
            const next = parsed[j + 1] ? parsed[j + 1].Height : curr;

            if (curr > prev && curr > next) {
                extrema.push({ ...parsed[i], type: 'max' });
            } else if (curr < prev && curr < next) {
                extrema.push({ ...parsed[i], type: 'min' });
            }

            // Skip over plateau
            i = j + 1;
        }

        return extrema;
    }

    // TODO: adjust for timezone
    const now = new Date();

    const CustomTooltip = ({ active, label }) => {
        if (!active) return null;

        const nearest = extrema.reduce((prev, curr) => (Math.abs(curr.time.getTime() - label) < Math.abs(prev.time.getTime() - label) ? curr : prev));
        const coords = extremaCoords.get(nearest.time.getTime());
        if (!coords) return null;

        return (
            <div
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    left: `${coords.cx}px`,
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
            <div className="mb-1 font-medium flex flex-row items-center">
                <h3 className="text-xl">Tide Predictions</h3>
            </div>
            {parsed && parsed.length && (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={600} height={300} data={parsed} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid stroke="var(--card-3)" strokeDasharray="3 3" />
                        <XAxis
                            tick={{ fill: 'var(--text)' }}
                            axisLine={{ stroke: 'var(--text)' }}
                            tickLine={{ stroke: 'var(--text)' }}
                            dataKey="time"
                            tickFormatter={(time) => format(time, 'HH:mm')}
                            type="number"
                            domain={[Math.min(...parsed.map((d) => d.time.getTime())), Math.max(...parsed.map((d) => d.time.getTime()))]}
                            scale="time"
                            interval={0}
                            ticks={getTicks()}
                        />
                        <YAxis
                            tick={{ fill: 'var(--text)' }}
                            axisLine={{ stroke: 'var(--text)' }}
                            tickLine={{ stroke: 'var(--text)' }}
                            label={{ value: 'Height in feet (MLLW)', angle: -90, position: 'insideLeft', dy: 80, style: { fill: 'var(--text)' } }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line dataKey="Height" stroke="var(--links)" strokeWidth={2} dot={false} activeDot={false} />
                        <Line
                            data={extrema}
                            type="monotone"
                            dataKey="Height"
                            stroke="transparent"
                            strokeWidth={2}
                            dot={{ r: 5 }}
                            activeDot={(props) => {
                                const { cx, cy, payload } = props;
                                extremaCoords.set(payload.time.getTime(), { cx, cy });
                                const isExtrema = extrema.some((e) => e.time.getTime() === payload.time.getTime());
                                if (isExtrema) {
                                    return <circle cx={cx} cy={cy} r={8} fill="var(--links)" />;
                                }
                                return null;
                            }}
                        />
                        {extrema &&
                            extrema.map((point, idx) => (
                                <ReferenceDot key={idx} x={point.time.getTime()} y={point.Height} r={4} fill="var(--text)">
                                    <Label value={`${point.Height.toFixed(2)}`} position={point.type === 'max' ? 'top' : 'bottom'} fill="var(--text)" fontSize={12} />
                                </ReferenceDot>
                            ))}
                        <ReferenceLine
                            x={now.getTime()}
                            stroke="red"
                            strokeDasharray="3 3"
                            label={{ value: 'Current Time (LST/LDT)', fill: 'red', angle: 90, dy: -40, dx: 10, style: { fontSize: 13 } }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </>
    );
}
