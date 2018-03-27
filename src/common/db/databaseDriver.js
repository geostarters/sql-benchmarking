// @flow
"use strict";

/**
 * An abstract database connection driver.
 *
 * @param {boolean} isConnected A boolean telling if the driver is connected
 * @param {boolean} ssl A boolean telling if the connection must be secure
 * @param {number} connectionTimeoutMillis Connection timeout
 * @param {Object} driver The database driver
 */
class DatabaseDriver {

	isConnected: boolean;
	ssl: boolean;
	connectionTimeoutMillis: number;
	driver: ?Object;

	constructor(options: DatabaseDriverOptions = {}) {

		this.isConnected = false;
		this.ssl = options.ssl || false;
		this.connectionTimeoutMillis = options.connectionTimeoutMillis || 1000;
		this.driver = null;

	}

	/**
	 * Connects to the database
	 *
	 * @param {string} host
	 * @param {number} port
	 * @param {string} user
	 * @param {string} password
	 * @param {string} databaseName
	 * @throws {Error} Throws an error if trying to use this class directly
	 * @returns {Promise<Object>} A promise that resolves when connected
	 */
	connect(host: string, port: number, user: string, password: string,
		databaseName: string): Promise<Object> {

		throw new Error(`connect(${host},${port},${user},${password},${databaseName}) method must be implemented in all DatabaseDriver sublclasses`);

	}

	/**
	 * Checks if the server is connected and runs a query
	 *
	 * @param {string} sqlString The SQL query
	 * @throws {Error} Throws an error if trying to use this class directly
	 * @returns {Promise<Object>} A promise that resolves when the query is done
	 */
	query(sqlString: string): Promise<Object> {

		if (this.isConnected) {

			return this.doQuery(sqlString);

		} else {

			return Promise.reject(new Error("Database is not connected"));

		}

	}

	/**
	 * Runs a query
	 *
	 * @param {string} sqlString The SQL query
	 * @throws {Error} Throws an error if trying to use this class directly
	 * @returns {Promise<Object>} A promise that resolves when the query is done
	 */
	doQuery(sqlString: string): Promise<Object> {

		throw new Error(`doQuery(${sqlString}) method must be implemented in all DatabaseDriver sublclasses`);

	}

	/**
	 * Disconnects from the server
	 */
	release() {

		if (this.driver) {

			this.driver.end();

		}

		this.isConnected = false;

	}

}

module.exports = DatabaseDriver;
