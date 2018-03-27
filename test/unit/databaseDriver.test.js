"use strict";

require("flow-remove-types/register");
const test = require("tap").test;
const DatabaseDriver = require("../../dist/common/db/databaseDriver");

test("Database Driver", (t) => {

	t.test("#Empty constructor", (t) => {

		const pg = new DatabaseDriver();

		t.ok(pg instanceof DatabaseDriver, "creates an object with no options");
		t.equal(pg.isConnected, false);
		t.equal(pg.ssl, false);
		t.equal(pg.connectionTimeoutMillis, 1000);
		t.equal(pg.driver, null);

		t.end();
		
	});
	
	t.test("#Constructor with custom data", (t) => {

		const options = {
			ssl: true,
			connectionTimeoutMillis: 5
		};
		const pg = new DatabaseDriver(options);

		t.ok(pg instanceof DatabaseDriver, "creates an object with no options");
		t.equal(pg.isConnected, false);
		t.equal(pg.ssl, options.ssl);
		t.equal(pg.connectionTimeoutMillis, options.connectionTimeoutMillis);
		t.equal(pg.driver, null);
		
		t.end();
		
	});

	t.test("#connect", async (t) => {

		const pg = new DatabaseDriver();
		t.throws(() => pg.connect("", 0, "", "", ""));
		pg.release();
		t.end();
		
	});
	
	t.test("#query", async (t) => {

		const pg = new DatabaseDriver();
		t.rejects(pg.query(""));
		pg.release();
		t.end();
		
	});

	t.test("#doQuery", async (t) => {

		const pg = new DatabaseDriver();
		t.throws(() => pg.doQuery(""));
		pg.release();
		t.end();
		
	});

	t.end();
	
});
