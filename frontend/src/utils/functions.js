const titleCase = (str) => {
    let split = str.toLowerCase().split(/\s|-/);
    for (let i = 0; i < split.length; i++) {
        split[i] = `${split[i].charAt(0).toUpperCase()}${split[i].substring(1)}`;
    }
    return split.join(' ');
};

const nowInTimeZone = (timeZone) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const parts = formatter.formatToParts(new Date());
    const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));

    return new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`);
};

export { titleCase, nowInTimeZone };
