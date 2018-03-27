declare type BenchmarkResult = {
	name: string,
	totalTimeInus: number,
	averageTimeInus: number,
	stdDevInus: number,
	executionTimes: Array<number>,
	iterationNumber: number
}

declare type BenchmarkSuiteResults = {

	name: string,
	totalTimeInus: number,
	averageTimeInus: number,
	stdDevInus: number,
	executionTimes: Array<number>,
	testResults: Array<BenchmarkResult>

};