// @flow
"use strict";

const cluster = require("cluster");
const TestingService = require("./services/testingService.js");
const testingService = new TestingService();
const cron = require("node-cron");

if (cluster.isMaster) {

	const cpuCount = require("os").cpus().length;
	for (let i = 0; i < cpuCount; ++i) {

		cluster.fork();

	}

	cron.schedule("0 0 * * *", () => {

		runTests();

	});

} else {

	const express = require("express");
	const bodyParser = require("body-parser");
	const logger = require("morgan");
	const cors = require("cors");
	const DefaultConfig = require("./config");
	const Utils = require("./common/utils");

	const app = express();

	app.set("port", process.env.PORT || DefaultConfig.port);
	app.use(express.static("static"));
	app.use(logger("dev"));
	app.use(bodyParser.json({
		limit: "10mb"
	}));
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.raw());
	app.use(cors());

	process.on("unhandledRejection", (reason, p) => {

		console.log("Unhandled Rejection at: Promise", p, "reason:", reason);

	});

	app.use("/", async (req, res) => {

		try {

			res.json({"msg": "No test data viz, yet!"});

		} catch (error) {

			res.json(Utils.buildErrorResponse(error));

		}

	});

	app.listen(app.get("port"));
	console.log(`App listening on ${app.get("port")}`);

}

function runTests() {

	testingService.runTestsInFolder("./inputs");

}
