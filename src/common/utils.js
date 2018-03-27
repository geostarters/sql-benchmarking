// @flow
"use strict";

/**
 * Utility functions
 */
class Utils {

	/**
	 * Creates an object representation of an error object
	 *
	 * @param {Error} error The error
	 * @returns {ErrorResponseObject} The ErrorResponseObject
	 */
	static buildErrorResponse(error: Error): ErrorResponseObject {

		return {
			"ok": false,
			"message": `${error.name}: ${error.message}`
		};

	}

	/**
	 * Creates an object representation of an error message
	 *
	 * @param {string} error The error message
	 * @returns {ErrorResponseObject} The ErrorResponseObject
	 */
	static buildErrorResponseFromMessage(error: string): ErrorResponseObject {

		const errorText = error || "No error message provided";

		return {
			"ok": false,
			"message": errorText
		};

	}

}

module.exports = Utils;
