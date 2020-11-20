const {body, param} = require("express-validator");

const getUser = function() {
    return [param("userID").isLength({min: 24, max:24}).isString()]
}
const createUser = function(){
    return [body("email").isEmail(), body("name").isString().isLength({min:1, max:75}), body("password").custom(), body("role").isIn(["admin", "moderator", "user"])]
}
const patchUser = function(){
    return [param("userID").isLength({min:24, max:24}).isString(), body("email").isEmail(), body("name").isString().isLength({min:1, max:75}), body("password").if(body("password").exists().isLength({min:8})), body("role").isIn(["admin", "moderator", "user"])]
}
const deleteUser = function () {
    return [param("userID").isLength({min:24, max:24}).isString()]
}

module.exports = {
    getUser, 
    createUser,
    patchUser,
    deleteUser,
}