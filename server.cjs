const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const{ObjectId} = require('mongoose')
const cors = require('cors')

const{Restaurant,Users} = require('./schema.cjs')

const app = express()
app.use(bodyParser.json())
app.use(cors())
async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://Karneya:Karneya53@cluster0.jrcsdee.mongodb.net/SwiggyBackend?retryWrites=true&w=majority')
        console.log(`DB Connection Established`)
        const port = process.env.Port || 8000
        app.listen(port,function(){
            console.log(`Listening on port ${port}...........`)
        })
    }catch(error){
        console.log(error)
        console.log('Couldn\'t Establish connection :(')

    }
}
connectToDb()
app.post('/add-restaurant',async function(request,response){
    try{
        await Restaurant.create({
            "areaName" : request.body.areaname,
            "avgRating" : request.body.avgrating,
            "costForTwo" : request.body.costForTwo,
            "cuisines" : request.body.cuisines,
            "resname" : request.body.name
        })
        response.status(201).json({
            "status" : "success",
            "message" : "user created"
            })
    } catch (error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "internal server error",
            "error" : error
        })
    }
})

app.get('/get-restaurant-details', async function(request,response){
    try{
        const restaurantDetails = await Restaurant.find()
        response.status(200).json(restaurantDetails)

    } catch (error){
 response.status(500).json({
            "status" : "failure",
            "message" : "couldnot fetch details",
            "error" : error
        })
    }
})

app.delete('/delete-restaurant-detail/:id',async function(request,response){
    try{
       const restaurant = await Restaurant.findById(request.params.id)
       if(restaurant){
        await Restaurant.findByIdAndDelete(request.params.id)
        response.status(201).json({
            "status" : "success",
            "message" : "deleted successfully"
            })
       }
       else{
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not found"
        })
       }
        
    } catch (error){
 response.status(500).json({
            "status" : "failure",
            "message" : "could not delete",
            "error" : error
        })
    }
})

app.post('/create-new-user', async function(request, response) {
    try {
         await Users.create({
             
             "contact" : request.body.contact,
             "email" : request.body.email,
             "password" : request.body.password,
             "userName" : request.body.username
         })
         response.status(201).json({
         "status" : "success",
         "message" : "user created"
         })
    } catch(error) {
         response.status(500).json({
             "status" : "failure",
             "message" : "internal server error"
         })
    }
 })
 
 app.post('/validate-user', async function(request, response) {
 try{
     const user = await Users.findOne({
        "email" : request.body.email,
        "password" : request.body.password

     })
     if(user){
        response.status(200).json({
            "message" : "valid user"
        })
     }
     else{
        response.status(401).json({
            "message" : "invalid user"
        })
     }
 } catch(error){
    response.status(500).json({
        "message" : "internal server error"
    })
 }
 })

