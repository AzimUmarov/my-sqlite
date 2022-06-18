const csv = require("csvtojson");

async function printDataForCLI(table_name, column_names, column_name, criteria){
    //Load the csv to json
    const jsonData = await csv().fromFile(table_name);
    for (let i = 0; i < jsonData.length; i++) {
        if (column_names[0] === '*') {
            let str = '';
            for (let key of Object.keys(jsonData[i]))
                str += jsonData[i][key] + '|';
            console.log(str.slice(0, -1));
        } else {
            let auth = 1;
            if (column_name) {
                for (let j = 0; j < column_name.length; j++)
                    if (jsonData[i][column_name[j]] !== criteria[j])
                        auth = 0;
            }
            if (auth) {
                let str = '';
                for (let j = 0; j < column_names.length; j++)
                    str += jsonData[i][column_names[j]] + '|';
                console.log(str);
            }
        }
    }
    return false;
}

module.exports = printDataForCLI;