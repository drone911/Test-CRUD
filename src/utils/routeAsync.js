const express = require("express");
const { validationResult } = require("express-validator");
const httpStatus = require("http-status");
const ApiError = require("./ApiError");
/**
 * Wraps the handler to catch all uncaught errors and propogates them to a error handling middleware
 * @param {express.RequestHandler} cb
 * @returns {express.RequestHandler}
 */
async function routeAsync(cb) {
	return function (req, res, next) {
		return new Promise((resolve) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw new ApiError(httpStatus.BAD_REQUEST, errors.array.toString());
            }
            cb(req, res, next);
            resolve();
		}).catch((err) => {
			next(err);
		});
	};
}
module.exports = routeAsync;
