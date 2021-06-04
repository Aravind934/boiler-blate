const mongoose = require('mongoose') 

let userSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

let user = mongoose.model('users',userSchema)

module.exports =user