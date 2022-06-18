const csv = require("csvtojson");
const {Parser} = require("json2csv");
const getKeys = require("../functions/getKeys")
const fs = require("fs");

async function ordering(table_name, order_column, ordertype, usingFromCLI){
    //Load the csv to json
    let jsonData = await csv().fromFile(table_name);

    if (ordertype === "asc")
        jsonData = jsonData.sort((a, b) => (a[order_column] < b[order_column] ? -1 : 1));
    if (ordertype === "desc")
        jsonData = jsonData.sort((a, b) => (a[order_column] > b[order_column] ? -1 : 1));
    else
        console.log("Your order type is invalid");

    let keys = getKeys(jsonData)[0];

    const jsonDataInCsv = new Parser({fields: keys}).parse(jsonData);

    fs.writeFileSync(table_name, jsonDataInCsv);
    if(!usingFromCLI)
    console.log("Successfully ordered");
    return false;
}

module.exports = ordering;