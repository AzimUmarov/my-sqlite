const csv = require("csvtojson");
const {Parser} = require("json2csv");
const fs = require("fs");
const isMatch = require("../functions/isMatch");
const getKeys = require("../functions/getKeys");

async function deletingAndUpdating(table_name, column_name, criteria, data, updating, usingFromCLI){
    let res;
    //Load the csv to json
    let jsonData = await csv().fromFile(table_name);
    for (let i = 0; i < jsonData.length; i++) {
        if (isMatch(jsonData[i], column_name, criteria)) {
            if (updating) {
                // values to array
                let dataArr;
                if (data.includes("=>")) {
                    dataArr = data.split(" => ").join("").split("', '").join("$").split("''").join("$").split("\", '").join("$").split("'\"").join("$");
                    dataArr = dataArr.slice(1);
                    dataArr = dataArr.slice(0, -1);
                    dataArr = dataArr.split("$");
                } else {
                    dataArr = data.split(",").join("$").split(' ').join("$").split("$");
                }
                // update data
                for (let j = 0; j < dataArr.length; j += 2)
                    jsonData[i][dataArr[j]] = dataArr[j + 1];
                if(!usingFromCLI)
                    console.log("Successfully updated");
                res = "updated";
            } else {
                //delete data from json
                jsonData.splice(i, 1);
                if(!usingFromCLI)
                    console.log("Successfully deleted");
                res = "deleted";
            }
            //Come back to CSV  from Json and write to file that changes
            let keys = getKeys(jsonData)[0];
            const jsonDataInCsv = new Parser({fields: keys}).parse(jsonData);
            fs.writeFileSync(table_name, jsonDataInCsv);
            // console.log("Successfully write to the file");
            break;
        }
    }
    if (!res)
        console.log("No match found");

    return res;
}


module.exports = deletingAndUpdating;