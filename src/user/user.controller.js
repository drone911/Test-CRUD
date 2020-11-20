const httpStatus = require("http-status");
const routeAsync = require("../utils/routeAsync");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

const getUsers = routeAsync(async (req, res, next) => {
	res.status(httpStatus.OK).json(userService.getAllUsers());
});

const createUser = routeAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body);
	res.status(httpStatus.CREATED).json(user);
});

const getUser = routeAsync(async (req, res, next) => {
	const user = await userService.getUserByID(req.params.userID);
	if (user) {
		res.status(httpStatus.OK).json(user.toJSON());
	}
	throw new ApiError(httpStatus.NOT_FOUND, "User not found", true);
});

const patchUser = routeAsync(async (req, res, next) => {
	const user = await userService.patchUser(req.params.userID, req.body);
	res.send(user);
});

const deleteUser = routeAsync(async(req, res, next) => {
	await userService.deleteUser(req.body.userID);
	res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
	getUsers,
	getUser,
	createUser,
	patchUser,
	deleteUser
}