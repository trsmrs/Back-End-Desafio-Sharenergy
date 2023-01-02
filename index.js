require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const connection = require('./db')

const customersRoutes = require('./routes/customers')
const authRoutes = require('./routes/auth')


// conexão com o banco de dados aqui
connection()

// middlwares
app.use(express.json())
app.use(cors())
app.use(
    express.urlencoded({
        extended: true
    }),
)


// Rotas
app.use('/api/customers', customersRoutes)
app.use('/api/auth',authRoutes)



const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`Listening on port ${port}...`))