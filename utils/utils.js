function isFunction (o) {
    return Object.prototype.toString.call(o) === "[object Function]";
}

function splitDateStr(dateStr) {
    return {
        year: dateStr.slice(0, 4),
        month: dateStr.slice(4, 6),
        day: dateStr.slice(6)
    };
}

export {
    isFunction,
    splitDateStr
};

