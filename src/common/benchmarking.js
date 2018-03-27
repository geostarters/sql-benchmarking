// @flow
"use strict";

const microtime = require("microtime");

/**
 * Benchmarking functions
 */
class Benchmark {

	name: string;
	iterations: number;
	funcToRun: any;

	constructor(name: string, funcToRun: any, iterations: number = 100) {

		this.name = name;
		this.iterations = iterations || 100;
		this.funcToRun = funcToRun;

	}

	async run(): BenchmarkResult {

		const executionTimes = [];
		let totalTimeInus = 0;

		for (let i = 0; i < this.iterations; ++i) {

			const iterStartTime = microtime.now();

			await this.funcToRun();

			const iterEndTime = microtime.now();

			let iterTime = iterEndTime - iterStartTime;
			iterTime = Math.max(1, iterTime);
			totalTimeInus += iterTime;

			executionTimes.push(iterTime);

		}

		const averageTimeInus = totalTimeInus / this.iterations;
		const sqrdAvgDiffSum = executionTimes.reduce((accum, current) => {

			return accum + (current - averageTimeInus) * (current - averageTimeInus);

		}, 0);
		const stdDevInus = Math.sqrt(sqrdAvgDiffSum / executionTimes.length);

		return {
			name: this.name,
			totalTimeInus,
			averageTimeInus,
			stdDevInus,
			executionTimes,
			iterationNumber: this.iterations
		};

	}

}

class Suite {

	name: string;
	iterations: number;
	tests: Array<Benchmark>;
	hasBeginHook: boolean;
	hasEndHook: boolean;
	beginHook: any;
	endHook: any;

	constructor(name: string, iterations: number = 100) {

		this.name = name;
		this.iterations = iterations;
		this.tests = [];
		this.hasBeginHook = false;
		this.hasEndHook = false;

	}

	addTest(test: Benchmark) {

		this.tests.push(test);

	}

	setBeginHook(funcToRun: any) {

		this.beginHook = funcToRun;
		this.hasBeginHook = true;

	}

	setEndHook(funcToRun: any) {

		this.endHook = funcToRun;
		this.hasEndHook = true;

	}

	async run(): BenchmarkSuiteResults {

		const testResults = [];
		const executionTimes = [];
		let totalTimeInus = 0;

		for (let i = 0; i < this.iterations; ++i) {

			if (this.hasBeginHook) {

				await this.beginHook();

			}

			const iterTestResults = [];
			let iterTotalTimeInus = 0;

			for (let j = 0; j < this.tests.length; ++j) {

				const test = this.tests[j];
				const result = await test.run();
				iterTestResults.push(result);
				iterTotalTimeInus += result.totalTimeInus;

			}

			testResults.push(iterTestResults);
			executionTimes.push(iterTotalTimeInus);
			totalTimeInus += iterTotalTimeInus;

			if (this.hasEndHook) {

				await this.endHook();

			}

		}

		const averageTimeInus = totalTimeInus / this.iterations;
		const sqrdAvgDiffSum = executionTimes.reduce((accum, current) => {

			return accum + (current - averageTimeInus) * (current - averageTimeInus);

		}, 0);
		const stdDevInus = Math.sqrt(sqrdAvgDiffSum / executionTimes.length);

		return {
			name: this.name,
			totalTimeInus,
			averageTimeInus,
			stdDevInus,
			executionTimes,
			iterationNumber: this.iterations,
			testResults
		};

	}

}

module.exports = {
	Benchmark,
	Suite
};
