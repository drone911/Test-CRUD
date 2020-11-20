const { Router } = require("express");

const userValidator = require("./user.validator");
const userController = require("./user.controller");
const router = Router();

router
    .route("/users")
    .get(userController.getUsers)
    .post(userValidator.createUser, userController.createUser)
    .get("/:userID", userValidator.getUser, userController.getUser)
    .patch("/:userID", userValidator.patchUser, userController.patchUser)
    .delete("/:userID", userValidator.deleteUser, userController.deleteUser);
module.exports = router;
