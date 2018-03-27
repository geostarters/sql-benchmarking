# SQL-benchmarking

Node Express server that loads a cron service that runs all the sql files inside a folder and computes some statistical properties.

Use `npm install` to install all the dependencies and `npm run` to start the server.

## Configuration
### Config parameters
There's a [config file](./src/config.js) in _src/config.js_ with some server and database connection parameters, you must change it in order to connect to your database. If a variable with the same name is found in the environment, that's used instead of the default value.

| Parameter name        | Description           |
| ------------- |:-------------:|
| __port__ | The port where the server is listening from |
| __dbHost__ | The database host name |
| __dbPort__ | The port where the database server is listening from |
| __dbName__ | The database name |
| __dbUser__ | The database connection user name |
| __dbPassword__ | The database connection password |

### Setting the cron time interval
This project uses __node-cron__ to perform the benchmarking on regular intervals. 

You can configure it in line 18 of the [src/index.js](./src/index.js) file.
Take a look at the [node-cron documentation](https://www.npmjs.com/package/node-cron) in order to set the time interval

### Setting the benchmarks to run
You can put a number of SQL files in the inputs folder and they will get executed 100 times each. 

If files with _name_delete.sql_ are found, those are used as SQL clean-up instructions after each benchmark is run.

## Output
Running the benchmarks will generate a huge number of files, one per each benchmark iteration of each file. 

### Output summary
A JSON file with the name _timestamp.json_ is generated with the summary of the run. It contains the following data:
```
[
	{
		"name": "Test suite insert-update-point.sql",
		"totalTimeInus": 30053006,
		"averageTimeInus": 300530.06,
		"stdDevInus": 59726.80802350314,
		"executionTimes": [504051, 512051, 271027, 271027, 271027, ...],
		"iterationNumber": 100
	}, {
		"name": "Test suite upload-fitxer-point.sql",
		"totalTimeInus": 574118684,
		"averageTimeInus": 5741186.84,
		"stdDevInus": 2299186.9391683987,
		"executionTimes": [27872787, 5554555, 5675569, 5512552, ...],
		"iterationNumber": 100
	}, {
		"name": "Test suite upload-tematic-fitxer-point.sql",
		"totalTimeInus": 709933705,
		"averageTimeInus": 7099337.05,
		"stdDevInus": 1702615.6798218053,
		"executionTimes": [23906390, 6908689, 7001699, 7001701, ...],
		"iterationNumber": 100
	}
]
```
where 

| Parameter name        | Description           |
| ------------- |:-------------:|
| __name__ | The sql file used by this test |
| __totalTimeInus__ | The total time in microseconds to run all the iterations |
| __averageTimeInus__ | The average time of a run in microseconds  |
| __stdDevInus__ | The standard deviation of time in microseconds |
| __executionTimes__ | An array with the time of each execution |
| __iterationNumber__ | The number of iterations |

### Output files
In addition of the summary file, a number of JSON files with the name _timestamp_input_file_name_iteration.json_ are created. Those give much more detail of the benchmark run, giving a summary of the timings of each sql instruction run in a given iteration. The files used as SQL clean-up are not benchmarked.
