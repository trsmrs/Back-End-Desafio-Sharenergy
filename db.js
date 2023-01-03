const mongoose = require("mongoose");
const express = require('express')
const app = express()

mongoose.set('strictQuery', false)

app.use(
    express.urlencoded({
      extended: true,
    }),
  )

module.exports = () =>{
    const connectionParams = {
        useNewUrlParser: true,
    }
    
    try{
      mongoose.connect(process.env.MONGODB_URI, connectionParams)
      console.log('Connected to database successfully')
    }catch(error){
        console.log(error)
        console.log("could not connect")
     }
}
