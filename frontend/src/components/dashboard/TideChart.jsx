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

        for (let i = 1; i < parsed.length - 1; i++) {
            const prev = parsed[i - 1].Height;
            const curr = parsed[i].Height;
            const next = parsed[i + 1].Height;

            if (curr > prev && curr > next) {
                extrema.push({ ...parsed[i], type: 'max' });
            } else if (curr < prev && curr < next) {
                extrema.push({ ...parsed[i], type: 'min' });
            }
        }
        return extrema;
    }

    // TODO: adjust for timezone
    const now = new Date();

    return (
        <>
            <div className="mb-1 font-medium flex flex-row items-center">
                <h3 className="text-xl">Tide Predictions</h3>
            </div>
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
                        domain={['auto', 'auto']}
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
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--background)',
                            color: 'var(--text)',
                            padding: '4px 8px',
                            border: '1px solid var(--card-2)',
                            borderRadius: '8px',
                            boxShadow: '1px 1px 3px #222',
                        }}
                        labelFormatter={(time) => format(time, 'MMM d, HH:mm')}
                        formatter={(value) => `${value.toFixed(2)} ft`}
                    />
                    <Line
                        type="monotone"
                        dataKey="Height"
                        stroke="var(--links)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={(props) => {
                            const { cx, cy, payload } = props;
                            const isExtrema = extrema.some((e) => e.time.getTime() === payload.time.getTime());
                            if (isExtrema) {
                                return <circle cx={cx} cy={cy} r={8} fill="var(--links)" />;
                            }
                            return <circle cx={cx} cy={cy} r={4} fill="var(--links)" />;
                        }}
                    />
                    {extrema &&
                        extrema.map((point, idx) => (
                            <ReferenceDot key={idx} x={point.time.getTime()} y={point.Height} r={4} fill="var(--text)">
                                <Label value={`${point.Height.toFixed(2)}`} position={point.type === 'max' ? 'top' : 'bottom'} fill="var(--text)" fontSize={12} />
                            </ReferenceDot>
                        ))}
                    <ReferenceLine x={now.getTime()} stroke="red" strokeDasharray="3 3" label={{ value: 'Now', fill: 'var(--text)' }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
