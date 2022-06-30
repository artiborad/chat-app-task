const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    isOnline: { type: Boolean, default:false }
})

module.exports = mongoose.model('users',UserSchema)
