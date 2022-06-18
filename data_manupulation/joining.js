const csv = require("csvtojson");
const {Parser} = require("json2csv");
const fs = require("fs");
const getKeys = require("../functions/getKeys");

async function joining(table_name, filename_db_b, column_on_db_a, column_on_db_b, usingFromCLI){
    //Load the csv to json
    let jsonData = await csv().fromFile(table_name);
    let jsonData2 = await csv().fromFile(filename_db_b);
    let keys = getKeys(jsonData)[0];
    let keys2 = getKeys(jsonData2)[0];
    let newJson = [];
    for (let i = 0; i < jsonData.length; i++) {
        for (let j = 0; j < jsonData2.length; j++) {
            if (jsonData[i][column_on_db_a] === jsonData2[j][column_on_db_b]) {
                let newJsonElement = {};
                for (let k = 0; k < keys.length; k++) {
                    newJsonElement[keys[k]] = jsonData[i][keys[k]];
                }
                for (let k = 0; k < keys2.length; k++) {
                    newJsonElement[keys2[k]] = jsonData2[j][keys2[k]];
                }
                newJson.push(newJsonElement);
            }
        }
    }
    const jsonDataInCsv = new Parser({fields: keys}).parse(newJson);
    fs.writeFileSync(table_name, jsonDataInCsv);
    if(!usingFromCLI)
    console.log("joined successfully");
}

module.exports = joining;
