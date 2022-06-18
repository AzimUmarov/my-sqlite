
function getKeys(obj) {
    let keys = Object.keys(obj);
    let length = keys.length;

    if (length !== 0) {
        for (let i = 0; i < length; i++)
            if (typeof obj[keys[i]] === 'object')
                keys[keys[i]] = getKeys(obj[keys[i]]);
    }

    return keys;
}

module.exports = getKeys;