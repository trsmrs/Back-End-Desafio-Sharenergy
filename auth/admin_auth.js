const express = require('express')
const app = express()
const joi = require('joi')
const bcrypt = require('bcrypt')
const cors = require('cors')
const { Admin } = require('../models/admins')


app.use(cors())

app.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body)
        if(error)
        return res.status(400).send({message: error.details[0].message})

        const admins = await Admin.findOne({name: req.body.name})
        if(!admins)
        
        return res.status(401).send({message: 'invalid User or Password'})

        const validPassword = await bcrypt.compare(
            req.body.password, admins.password
        )

        if(!validPassword)
        
          return res.status(401).send({message: 'invalid User or Password'})
        
          const token = admins.generateAuthToken()
          res.status(200).send({data: token, message: 'Logged in successfully'})

    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})


const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label('Name'),
        password: joi.string().required().label('Password'),
        
    })

    return schema.validate(data)
}


module.exports = app