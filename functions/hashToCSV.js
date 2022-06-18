function hashToCSV(data) {
    let str = '';
    if(data.includes("=>")) {
        data = data.split(" => ").join("").split("', '").join("$").split("''").join("$").split("\", '").join("$").split("'\"").join("$");
        data = data.slice(1);
        data = data.slice(0, data.length - 1);
        data = data.split("$");
    }
    else{
        str += '\r';
        str += data;
        return str;
        str += '\r';
    }
    for (let i = 1; i < data.length; i += 2) {
        str += '"';
        str += data[i];
        str += '"';
        if(i + 1 !== data.length)
            str += ',';
    }
    str += '\r';
    return str;
}

module.exports = hashToCSV;