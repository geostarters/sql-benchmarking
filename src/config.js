// @flow
"use strict";

module.exports = {

	port: parseInt(process.env.port) || 3000,
	dbHost: process.env.dbHost || "",
	dbPort: parseInt(process.env.dbPort) || 5432,
	dbName: process.env.dbName || "",
	dbUser: process.env.dbUser || "",
	dbPassword: process.env.dbPassword || ""

};
