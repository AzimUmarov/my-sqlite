
function commandToQuery(command) {
    let vars = {
        table_name: '', select: '', where: '', values: '', deleting: false, updating: false, inserting: false,
        selecting: false, setting_values: [], column_name: [], creteria: []
    };

    for (let i = 0; i < command.length; i++) {
        if (command[i] === 'FROM') {
            vars.table_name = command[i + 1];
        }
        if (command[i] === 'SELECT') {
            vars.select = command[i + 1];
            vars.select = vars.select.split(',');
            vars.selecting = true;
        }
        if (command[i] === 'WHERE') {
            for (let j = i + 1; j < command.length; j++)
                vars.where += command[j] + ' ';
            vars.where = vars.where.split("=").join('@').split("'").join('').split("@");
            vars.where[0] = vars.where[0].replace(' ', '');
            vars.where[1] = vars.where[1].slice(1);
            vars.where[1] = vars.where[1].slice(0, -1);
            let index = 0;
            for (let i = 0; i < vars.where.length; i += 2) {
                vars.column_name[index] = vars.where[i];
                vars.creteria[index] = vars.where[i + 1];
            }
        }
        if (command[i] === 'VALUES') {
            for (let j = i + 1; j < command.length; j++)
                vars.values += command[j] + ' ';
            vars.values = vars.values.slice(1);
            vars.values = vars.values.slice(0, -1);
            vars.values = vars.values.slice(0, -1);
        }

        if (command[i] === 'INSERT') {
            vars.inserting = true;
            vars.table_name = command[i + 2];
        }
        if (command[i] === 'DELETE')
            vars.deleting = true;
        if (command[i] === 'UPDATE') {
            vars.updating = true;
            vars.table_name = command[i + 1];
        }

        if (command[i] === 'JOIN')
            vars.select = command[i + 1];

        if (command[i] === 'SET') {
            function isUpper(str) {
                return !/[a-z]/.test(str) && /[A-Z]/.test(str);
            }

            for (let j = i + 1; j < command.length; j++) {
                if (isUpper(command[j]))
                    break;
                if (command[j] !== '=')
                    vars.setting_values += command[j] + ' ';
            }
        }
    }
    return vars;
}

module.exports = commandToQuery;