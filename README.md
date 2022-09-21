# my_sqlite
my_sqlite project Qwasar.io Season 2 Fullstack

# Welcome to My Sqlite
This is the final version of that project I tried six times and last time finallly I passed successfull peer review!

## Task
Implement SQLite request with CSV files and build CLI interface too

## Description
I implemented sqlite requests in this project.
After unsuccessful try in ruby rewrite in JS))
With OOP, and CLI interface
Working with CSV files like databases
This is interesting challenge


## Installation
````
npm install
````
````
wget https://storage.googleapis.com/qwasar-public/nba_player_data.csv
````
````
wget https://storage.googleapis.com/qwasar-public/nba_players.csv
````

## Usage
* dont forget (;) in CLI
* please don't forget to do escape ("\"") while checking, cause js can't read string if you dont do that
* From various csv formats, JS is conveniently selected. If the csv you entered does not give an error, it works correctly. Even if the format changes during the insert.
* there has only one problem in CLI after you write command and get result "my_sqlite>" disappeared from console.You need to press up arrow key for return the word(I'm wondering why? if you know why, please let me know)

TEST CASE 0:

let request = new MySqliteRequest();
request.from('nba_player_data.csv');
request.select('name');
request.run();

TEST CASE 1:

let request = new MySqliteRequest();
request.from('nba_player_data.csv');
request.select('name');
//request.select('college');
request.where('college', 'University of California');
request.run();

TEST CASE 2:

let request = new MySqliteRequest();
request.from('nba_player_data.csv');
request.select('name');
// request.select('college');
// request.select('year_start');
request.where('college', 'University of California');
request.where('year_start', '1997')
request.run();

TEST CASE 3:

let request = new MySqliteRequest
request.insert('nba_player_data.csv')
request.values("'name' => 'Azimjon Umarov', 'year_start' => '1999', 'year_end' => '2002', 'position' => 'F-F', 'height' => '8-12', 'weight' => '243', 'birth_date' => \"January 14, 2003\", 'college' => 'Astrum Academy'");
request.run();

TEST CASE 4:

let request = new MySqliteRequest;
request.update('nba_player_data.csv');
request.values("'name' => 'AZIM'");
request.where('name', 'Azimjon Umarov');
request.run();

TEST CASE 5:

let request = new MySqliteRequest;
request.delete();
request.from('nba_player_data.csv');
request.where('name', 'AZIM');
request.run();

TEST CASE 6:

let request = new MySqliteRequest;
request.delete();
request.from('nba_player_data.csv');
request.where('name', 'AZIM');
request.run();

TEST CASE 7:

let request = new MySqliteRequest;
request.from('nba_player_data.csv');
request.order("desc",'name');
request.run();

TEST CASE 8:

SELECT * FROM nba_player_data.csv;

TEST CASE 9:

SELECT name,year_end FROM nba_player_data.csv WHERE name = 'Zydrunas Ilgauskas';

TEST CASE 10:

UPDATE nba_player_data.csv SET year_end = '2022',year_start = '2020' WHERE name = 'Zydrunas Ilgauskas';
# it's first player(after descending order)

TEST CASE 11:

DELETE FROM nba_player_data.csv WHERE name = 'Zydrunas Ilgauskas';

TEST CASE 12:

INSERT INTO nba_player_data.csv VALUES ("Peter Parker","2002","2022","G-F","6-3","175","November 15, 2021","New York");


### MIT License
[![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0])  
<a href="https://github.com/theazimjon/my-sqlite/blob/main/LICENSE.md" > Copyright (c) 2022 Azimjon Umarov </a>
<p> Forbidden plagiarism for assigments! </p>

### The Core Team
Azimjon Umarov

<span><i>Made at <a href='https://qwasar.io'>Qwasar Silicon Valley</a></i></span>
<span><img alt='Qwasar Silicon Valley Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px'></span>
