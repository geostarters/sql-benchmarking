// @flow
"use strict";

const fs = require("fs");
const LineReader = require("n-readlines");

const PostgresDriver = require("../common/db/postgresDriver");
const Benchmarking = require("../common/benchmarking");
const Config = require("../config.js");

const Benchmark = Benchmarking.Benchmark;
const Suite = Benchmarking.Suite;

class TestingService {

	connection: PostgresDriver;

	constructor() {

		this.connection = new PostgresDriver();

	}

	async runTestsInFolder(path: string) {

		await this.connection.connect(Config.dbHost, Config.dbPort, Config.dbUser, Config.dbPassword, Config.dbName);

		const runs = [];
		const files = fs.readdirSync(path);
		const date = new Date();
		const now = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;

		for (let i = 0; i < files.length; ++i) {

			const file = files[i];

			if (file.indexOf("_delete") === -1) {

				console.log(`Running suite ${file}`);

				const benchSuite = new Suite(`Test suite ${file}`, 100);
				const lineReader = new LineReader(`${path}/${file}`);

				let line = lineReader.next();
				while (line) {

					const bench = this.createSQLBenchmark(line.toString());
					benchSuite.addTest(bench);
					line = lineReader.next();

				}

				benchSuite.setEndHook(async () => {

					await this.removeDBData(`${path}/${file}`);

				});
				const result = await benchSuite.run();
				const outputFileName = `${now}_${file.slice(0, -4)}`;

				result.testResults.forEach((result, index) => {


					fs.writeFileSync(`./outputs/${outputFileName}_${index}.json`, JSON.stringify(result), (err) => {

						if (err) {

							return console.log(err);

						}

					});

				});

				delete result.testResults;

				runs.push(result);
				console.log(`Suite ${file} ran in ${result.totalTimeInus}µs. Results can be found in ${outputFileName}_*.json`);

			}

		}

		fs.writeFileSync(`./outputs/${now}.json`, JSON.stringify(runs), (err) => {

			if (err) {

				return console.log(err);

			}

		});

	}

	createSQLBenchmark(sql: string): Benchmark {

		return new Benchmark(`SQL: ${sql}`, async () => {

			await this.connection.query(sql);

		}, 1);

	}

	async removeDBData(cleanupFile: string) {

		const file = cleanupFile.slice(0, -4);
		const lineReader = new LineReader(`${file}_delete.sql`);

		let line = lineReader.next();
		while (line) {

			await this.connection.query(line.toString("ascii"));
			line = lineReader.next();

		}


	}

	runSQLTest(name: string, sql: string): BenchmarkResult {

		const bench = this.createSQLBenchmark(sql);
		return bench.run();

	}

	release() {

		this.connection.release();

	}

}

module.exports = TestingService;
