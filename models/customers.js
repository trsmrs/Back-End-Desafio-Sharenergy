const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')


const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    cpf: { type: String, required: true }
    
})


const Customers = mongoose.model('customers', customerSchema)


const validate = (data) => {
 const schema = joi.object({
   name: joi.string().required().label('Name'),
   email: joi.string().required().label('Email'),
   phone: joi.string().required().label('Phone'),
   address: joi.string().required().label('Address'),
   cpf: joi.string().required().label('Cpf'),

 })
  return schema.validate(data)
}


module.exports = {Customers, validate}