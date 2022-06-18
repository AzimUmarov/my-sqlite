const csv = require("csvtojson");

async function printCSV(table_name, column_name, column_names, criteria){
        console.log(1);
        //Load the csv to json
        const jsonData = await csv().fromFile(table_name);
        process.stdout.write("[");
        for (let i = 0; i < jsonData.length; i++) {
            let auth = 1;
            if (column_name) {
                for (let j = 0; j < column_name.length; j++)
                    if (jsonData[i][column_name[j]] !== criteria[j])
                        auth = 0;
            }
            if (auth) {
                let str = "{";
                for (let j = 0; j < column_names.length; j++) {
                    if (jsonData[i][column_names[j]] !== undefined) {
                        if (j)
                            str += ' , "' + column_names[j] + '"';
                        else
                            str += '"' + column_names[j] + '"';
                        str += " => \"" + jsonData[i][column_names[j]] + '"';
                    }
                    else {
                        console.log("undefined column in the table");
                        return {
                            error: true,
                            message: "undefined column name"
                        }
                    }
                }
                console.log(str + "}");
            }
        }
        console.log("]");
        return false;
}

module.exports = printCSV;