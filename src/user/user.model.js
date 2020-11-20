const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,  
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        match: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
    },
    password: {
        select: false,
        minlength: 8,
        type: String,    
    },
    role: {
        type:String,
        enum: ['admin', 'moderator', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
/**
 * 
 * @param {String} password 
 * @returns {Promise<bool>}
 */
UserSchema.methods.comparePassword = function(password){
    return await bcrypt.compare(password, this.password);
}
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

UserSchema.static.isEmailTaken = async function(email, exceptID) {
    const user = await this.findOne({email: email, _id: {$ne: exceptID}});
    return user?true:false;
}
/**
 * @type {mongoose.Model}
 */
module.exports = mongoose.model("User", UserSchema);
