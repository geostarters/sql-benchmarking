"use strict";

require("flow-remove-types/register");
const test = require("tap").test;
const PostgresDriver = require("../../dist/common/db/postgresDriver");

test("Postgres Driver", (t) => {

	t.test("#Empty constructor", (t) => {

		const pg = new PostgresDriver();

		t.ok(pg instanceof PostgresDriver, "creates an object with no options");
		t.equal(pg.minConnectionSize, 4);
		t.equal(pg.maxConnectionSize, 20);
		t.equal(pg.idleTimeoutMillis, 1000);
		t.equal(pg.isConnected, false);
		t.equal(pg.ssl, false);
		t.equal(pg.connectionTimeoutMillis, 1000);

		t.end();
		
	});
	
	t.test("#Constructor with custom data", (t) => {

		const options = {
			minConnectionSize: 5,
			maxConnectionSize: 5,
			idleTimeoutMillis: 5,
			ssl: true,
			connectionTimeoutMillis: 5
		};
		const pg = new PostgresDriver(options);

		t.ok(pg instanceof PostgresDriver, "creates an object with no options");
		t.equal(pg.minConnectionSize, options.minConnectionSize);
		t.equal(pg.maxConnectionSize, options.maxConnectionSize);
		t.equal(pg.idleTimeoutMillis, options.idleTimeoutMillis);
		t.equal(pg.isConnected, false);
		t.equal(pg.ssl, options.ssl);
		t.equal(pg.connectionTimeoutMillis, options.connectionTimeoutMillis);

		t.end();
		
	});

	t.test("#connect", async (t) => {

		const pg = new PostgresDriver();
		t.rejects(pg.connect("127.0.0.1", 5432, "postgres", "postgres", "notExistingDB"));
		await t.resolves(pg.connect("127.0.0.1", 5432, "postgres", "postgres", 
			"postgres"));
		pg.release();
		t.end();
		
	});
	
	t.test("#query", async (t) => {

		const mockSQL = "SELECT * FROM spatial_ref_sys LIMIT 1";
		const pg = new PostgresDriver();
		
		await pg.connect("127.0.0.1", 5432, "postgres", "postgres", 
			"postgres");

		t.resolves(pg.query(mockSQL));
		const queryResult = await pg.query(mockSQL);
		t.equal(queryResult.rowCount, 1);
		pg.release();
		t.end();
		
	});

	t.end();
	
});
