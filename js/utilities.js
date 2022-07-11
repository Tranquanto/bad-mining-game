function capitalize(word) {
    const allWords = word.split(" ");
    for (let i = 0; i < allWords.length; i++) {
        const firstLetter = allWords[i].slice(0, 1);
        allWords[i] = firstLetter.toUpperCase() + allWords[i].slice(1);
    }
    return allWords.join(" ");
}

function uncapitalize(word) {
    const allWords = word.split(" ");
    for (let i = 0; i < allWords.length; i++) {
        const firstLetter = allWords[i].slice(0, 1);
        allWords[i] = firstLetter.toLowerCase() + allWords[i].slice(1);
    }
    return allWords.join(" ");
}

function camelCase(string) {
    const allWords1 = string.split(" ");
    for (let i = 1; i < allWords1.length; i++) {
        allWords1[i] = capitalize(allWords1[i]);
    }
    return allWords1.join("");
}

function camelCaseToRegular(string) {
    while (/[A-Z]/.test(string)) {
        const index = string.match(/[A-Z]/).index;
        const part1 = string.slice(0, index);
        const part2 = string.slice(index);
        string = `${uncapitalize(part1)} ${uncapitalize(part2)}`;
    }
    return string;
}

function oppositeColor({rgb, hex}) {
    if (rgb) {
        const cols = rgb.replaceAll(/[a-z(),]/g, "").split(" ");
        return `rgb(${255 - cols[0]}, ${255 - cols[1]}, ${255 - cols[2]})`;
    } else if (hex) {
        const cols = [];
        cols[0] = parseInt(hex.slice(1, 3), 16);
        cols[1] = parseInt(hex.slice(3, 5), 16);
        cols[2] = parseInt(hex.slice(5, 7), 16);

        function a(b) {
            const c = (255 - b).toString(16);
            if (c.length === 1) {
                return `0${c}`;
            } else {
                return c;
            }
        }

        return `#${a(cols[0])}${a(cols[1])}${a(cols[2])}`;
    }
}

function lerpColor(a, b, amount) {
    const ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);
    return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

function download(filename, content) {
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    a.setAttribute('download', filename);
    a.click();
    return encodeURIComponent(content);
}