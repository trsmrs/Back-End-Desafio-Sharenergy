require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const connection = require('./db')

const customersRoutes = require('./routes/customers')
const authRoutes = require('./auth/auth')
// const authAdminRoutes = require('./auth/admin_auth')
// const adminRoutes = require('./routes/admins')

// conexão com o banco de dados aqui
connection()

// middlwares
app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    app.use(cors())
    next()
})

app.use(cors({ origin: "http://127.0.0.1:8080", optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: 'http://127.0.0.1:8080', optionsSuccessStatus: 200 }));


// Rotas
// app.use('/api/admins',adminRoutes)
app.use('/api/customers', customersRoutes)
app.use('/api/auth',authRoutes)

// app.use('/api/admin',authAdminRoutes)



const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`Listening on port ${port}...`))