// @flow
"use strict";

const Pool = require("pg").Pool;
const DatabaseDriver = require("./databaseDriver");
const assert = require("assert");

/**
 * A Postgres database connection driver.
 *
 * @param {number} minConnectionSize The minimum number of simultaneous clients
 * @param {number} maxConnectionSize The maximum number of simultaneous clients
 * @param {number} idleTimeoutMillis Client idle timeout
 * @param {Object} client The database client
 * @example
 * var pg = new PostgresDriver();
 */
class PostgresDriver extends DatabaseDriver {

	minConnectionSize: number;
	maxConnectionSize: number;
	idleTimeoutMillis: number;
	client: ?Object;

	constructor(options: DatabaseDriverOptions = {}) {

		super(options);

		this.minConnectionSize = options.minConnectionSize || 4;
		this.maxConnectionSize = options.maxConnectionSize || 20;
		this.idleTimeoutMillis = options.idleTimeoutMillis || 1000;
		this.client = null;

	}

	/**
	 * Connects to the database
	 *
	 * @param {string} host
	 * @param {number} port
	 * @param {string} user
	 * @param {string} password
	 * @param {string} databaseName
	 * @returns {Promise<Object>} A promise that resolves when connected
	 */
	connect(host: string, port: number, user: string, password: string,
		databaseName: string): Promise<Object> {

		this.driver = this._connectPool(host, port, user, password, databaseName);

		return new Promise((resolve, reject) => {

			if (this.driver) {

				this.driver.connect()
					.then((client) => {

						this.isConnected = true;
						this.client = client;
						resolve(client);

					})
					.catch((error) => {

						reject(error);

					});

			} else {

				reject("PostgresDriver:connect Null driver");

			}

		});

	}

	/**
	 * Connects to the Postgres Pool
	 *
	 * @param {string} host
	 * @param {number} port
	 * @param {string} user
	 * @param {string} password
	 * @param {string} databaseName
	 * @returns {Object} The Pool object
	 */
	_connectPool(host: string, port: number, user: string, password: string,
		databaseName: string): Object {

		return new Pool({
			host: host,
			port: port,
			user: user,
			password: password,
			database: databaseName,
			ssl: this.ssl,
			max: this.maxConnectionSize,
			min: this.minConnectionSize,
			idleTimeoutMillis: this.idleTimeoutMillis,
			connectionTimeoutMillis: this.connectionTimeoutMillis
		});

	}

	/**
	 * Runs a query
	 *
	 * @param {string} sqlString The SQL query
	 * @returns {Promise<Object>} A promise that resolves when the query is done
	 */
	doQuery(sqlString: string): Promise<Object> {

		assert.equal(this.isConnected, true);
		return new Promise((resolve, reject) => {

			if (this.client) {

				this.client.query(sqlString)
					.then(res => {

						resolve(res);

					})
					.catch(error => {

						reject(error);

					});

			} else {

				reject("PostgresDriver:doQuery Null client");

			}

		});

	}

	/**
	 * Disconnects from the server
	 */
	release() {

		if (this.client) {

			this.client.end();
			this.client = null;

		}

		super.release();

	}

}

module.exports = PostgresDriver;
