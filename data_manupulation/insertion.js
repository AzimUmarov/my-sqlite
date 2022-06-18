const hashToCSV = require("../functions/hashToCSV");
const fs = require("fs");

function insertion(table_name, data, usingFromCLI) {
    fs.appendFile(table_name, hashToCSV(data), function (err) {
        if (err) return console.log(err + "--! Can not insert check your values");
        if(!usingFromCLI)
            console.log('Successfully inserted your data to the file');
    });
    return false;
}

module.exports = insertion;