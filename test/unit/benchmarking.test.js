"use strict";

require("flow-remove-types/register");
const test = require("tap").test;
const Benchmarking = require("../../dist/common/benchmarking");
const Benchmark = Benchmarking.Benchmark;

test("Benchmark", (t) => {

	t.test("#Empty constructor", (t) => {

		const funcToTest = () => {
			const a = 0;
		}
		const bench = new Benchmark("Test", funcToTest);

		t.ok(bench instanceof Benchmark, "creates an object");
		t.equal(bench.name, "Test");
		t.equal(bench.iterations, 100);
		t.equal(bench.funcToRun, funcToTest);

		t.end();
		
	});
	
	t.test("#Running a test", async (t) => {

		const funcToTest = () => {
			return Math.random();
		}
		const bench = new Benchmark("Test", funcToTest);
		const result = await bench.run();

		t.equal(result.name, "Test");
		t.equal(result.iterationNumber, 100);
		t.ok(result.executionTimes.length !== 0);
		t.ok(result.totalTimeInMs !== 0);

		t.end();
		
	});

	t.test("#Running a test with a iteration number", async (t) => {

		const numToRun = 50;
		let numTimesRan = 0;
		const funcToTest = () => {
			numTimesRan++;
		}
		const bench = new Benchmark("Test", funcToTest, numToRun);
		const result = await bench.run();

		t.equal(result.iterationNumber, numToRun);
		t.equal(numToRun, numTimesRan);

		t.end();
		
	});

	t.end();
	
});
