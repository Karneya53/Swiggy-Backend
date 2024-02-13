const mongoose = require('mongoose')


const restaurantsSchema = new mongoose.Schema({
    areaName : {
        type : String,
        required : true
    },
    avgRating : {
        type : Number,
        required : true
    },
    costForTwo : {
        type : String,
        required : true
    },
    cuisines : {
        type : Array,
        required : true
    },
    resname : {
        type : String,
        required : true
    }   
},{versionKey : false})
const Restaurant = mongoose.model('restaurantList',restaurantsSchema)


const userSchema = new mongoose.Schema({
    
    contact :{
        type : String,
        required : true,
        unique : true
     
    },
    email :{
        type : String,
        required : true,
        unique : true
     
    },
    password :{
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    }
    
   
},{versionKey : false})
const Users = mongoose.model('Detail',userSchema)

module.exports = {Restaurant, Users}

