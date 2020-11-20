const userModel = require("./user.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
/**
 * @description Returns all users in the database
 * @returns {Promise<mongoose.Document[]>}
 */
async function getAllUsers() {
    return await userModal.find();
}
/**
 * @description Create and returns a user
 * @param {Object|mongoose.Document} user  
 * @returns {Promise<mongoose.Document>}
 */
async function createUser(user) {
    if(userModal.isEmailTaken(user.email)){
        throw new ApiError(httpStatus.BAD_REQUEST,'Email already taken');
    }
    return await userModal.create(user)
}
/**
 * 
 * @param {String|mongoose.Types.ObjectId} id 
 * @returns {Promise<mongoose.Document>|Promise<null>}
 */
async function getUserByID(id){
    return await userModel.findById(id);
}

/**
 * @description Updates the User
 * @param {String|mongoose.Types.ObjectId} userID 
 * @param {Object} newUser 
 */
async function patchUser(userID, newUser){
    const user = await userModel.findById(userID);
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
    }
    if(newUser.email && userModel.isEmailTaken(newUser.email, userID)){
        throw new ApiError(httpStatus.BAD_REQUEST,'Email Already Taken');
    }
    Object.assign(user, newUser);
    return await user.save();
}
module.exports = {
    getAllUsers,
    createUser,
    getUserByID,
    patchUser,
}