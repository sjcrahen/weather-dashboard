const titleCase = (str) => {
    let split = str.toLowerCase().split(/\s|-/);
    for (let i = 0; i < split.length; i++) {
        split[i] = `${split[i].charAt(0).toUpperCase()}${split[i].substring(1)}`;
    }
    return split.join(' ');
};

export { titleCase };
