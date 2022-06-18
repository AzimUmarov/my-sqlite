const printData = require("./data_manupulation/printCSV");
const deletingAndUpdating = require("./data_manupulation/deleteAndUpdate");
const joining = require("./data_manupulation/joining");
const ordering = require("./data_manupulation/ordering");
const printDataForCLI = require("./data_manupulation/printDataForCLI");
const insertion = require("./data_manupulation/insertion");

class MySqliteRequest {
    constructor() {
        this.table_name;
        this.column_name;
        this.criteria;
        this.column_names;
        this.data;
        this.filename_db_b;
        this.column_on_db_a;
        this.column_on_db_b;
        this.ordertype;
        this.order_column;
        this.ordering = false;
        this.deleting = false;
        this.selectFromCLI = false;
        this.joining = false;
        this.updating = false;
        this.insertion = false;
        this.print = false;
        this.haveAError = false;
    }

    from(table_name) {
        if(!table_name)
            this.haveAError = true;
        this.table_name = table_name;
    }

    where(column_name, criteria) {
        if(!column_name || !criteria)
            this.haveAError = true;
        else {
            // create with array
            if (this.column_name) {
                this.column_name = this.column_name.concat(column_name);
                this.criteria = this.criteria.concat(criteria);
            } else if (Array.isArray(column_name) && Array.isArray(criteria)) {
                this.column_name = column_name;
                this.criteria = criteria;
            } else {
                this.column_name = [column_name];
                this.criteria = [criteria];
            }
        }
    }

    select(column_names) {
        if (!column_names)
            this.haveAError = true;
        else {
            this.print = true;
            if (this.column_names)
                this.column_names = this.column_names.concat(column_names);
            else
                this.column_names = [column_names];
        }
    }

    selectCLI(column_names) {
        if (!column_names)
            this.haveAError = true;
        else {
            this.selectFromCLI = true;
            this.column_names = column_names;
        }
    }

    insert(table_name) {
        if (!table_name)
            this.haveAError = true;
        else {
            this.insertion = true;
            this.table_name = table_name;
        }
    }


    values(data) {
        if(!data)
            this.haveAError = true;
        else
            this.data = data;
    }

    join(column_on_db_a, filename_db_b, column_on_db_b) {
        if (!column_on_db_b || !column_on_db_a || !filename_db_b)
            this.joining = true;
        else {
            this.filename_db_b = filename_db_b;
            this.column_on_db_a = column_on_db_a;
            this.column_on_db_b = column_on_db_b;
        }
    }

    order(order, column_name) {
        if(!order || !column_name)
            this.haveAError = true;
        else {
            this.ordering = true;
            this.ordertype = order;
            this.order_column = column_name;
        }
    }

    update(table_name) {
        if(!table_name)
            this.haveAError = true;
        else {
            this.updating = true;
            this.table_name = table_name;
        }
    }

    set(data) {
        if(!data)
            this.haveAError = true;
        else
            this.data = data;
    }

    delete(){
        this.deleting = true;
    }

    async run(usingFromCLI = false) {
        if(this.haveAError){
            console.log("Error(2) in your query please check your syntax(I recommended you to use the readme file)");
            return {
                error: true,
                message: "You have an error in your query"
            }
        }
        try {
            //print selected data
            if(this.print)
                this.print = printData(this.table_name,this.column_name, this.column_names, this.criteria);
            //print for CLI
            if (this.selectFromCLI)
                this.selectFromCLI = printDataForCLI(this.table_name, this.column_names, this.column_name, this.criteria);
            //order data
            if (this.ordering)
                this.ordering = ordering(this.table_name, this.order_column, this.ordertype, usingFromCLI);
            //join data
            if (this.joining)
                this.joining = joining(this.table_name, this.filename_db_b, this.column_on_db_a, this.column_on_db_b), usingFromCLI;
            //delete and update data
            if (this.updating || this.deleting){
                let res = deletingAndUpdating(this.table_name, this.column_name, this.criteria, this.data,this.updating, usingFromCLI);
                if(res === "deleted")
                    this.deleting = false;
                else
                    this.updating = false;
            }
            //insert data
            if (this.insertion)
                this.insertion = insertion(this.table_name, this.data,usingFromCLI);

        }
        catch (e) {
            console.log(e.message,"\nError(3) in your query please check your syntax(Check your CSV file)");
            return {
                error: true,
                message: "You have an error in your query"
            }
        }
    }


}

module.exports = MySqliteRequest;

//don't forget to delete Object from here before running the cli programm
let request = new MySqliteRequest
request.insert('nba_player_data.csv');
request.values("'name' => 'Azimjon Umarov', 'year_start' => '1999', 'year_end' => '2002', 'position' => 'F-F', 'height' => '8-12', 'weight' => '243', 'birth_date' => \"January 14, 2003\", 'college' => 'Astrum Academy'")
request.run();