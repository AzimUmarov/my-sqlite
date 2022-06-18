const commandToQuery = require("./commandToQuery");
const MySqliteRequest = require("../my_sqlite_request");

function commandRun(input) {
    if (!input.includes(' ') || input[input.length - 1] !== ';' || !((input.includes('SELECT') && input.includes('FROM')) || (input.includes('INSERT') && input.includes('INTO')) || (input.includes('UPDATE') && input.includes('SET')) || (input.includes('DELETE') && input.includes('FROM')))) {
        console.log("Error(1) in your query please check your syntax(I recommended you to use the readme file)");
        return {
            error: true,
            message: "You have an error in your query"
        };
    }
    try {
        input = input.slice(0, -1);
        let query = commandToQuery(input.split(' '));
        let request = new MySqliteRequest;

        if (query.selecting) {
            request.from(query.table_name);
            request.selectCLI(query.select);
            request.where(query.column_name, query.creteria);
            request.run(true);
        }
        if (query.inserting) {
            request.insert(query.table_name);
            request.values(query.values);
            request.run(true);
        }
        if (query.updating) {
            request.update(query.table_name);
            request.values(query.setting_values);
            request.where(query.column_name, query.creteria);
            request.run(true);
        }
        if (query.deleting) {
            request.delete();
            request.from(query.table_name);
            request.where(query.column_name, query.creteria);
            request.run(true);
        }
    } catch (e) {
        console.log(e.message + '\n Error in command 1');
        return {
            error: e.message
        }
    }
}

module.exports = commandRun;