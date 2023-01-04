const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')




const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: false }
})

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, {
        expiresIn: "2y",
    });
    return token;
};


const Admin = mongoose.model('admin', adminSchema)

const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label('Name'),
        password: joi.string().label('Password')
    })
    return schema.validate(data)
}


module.exports = { Admin, validate }