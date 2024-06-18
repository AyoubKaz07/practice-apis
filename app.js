require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const connectDB = require('./db/connect')
const ProductsRouter = require ('./routes/products') 

const notfound = require('./middleware/not-found')
const errorhandler = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is running' })
})

// products route
app.use('/api/v1/products', ProductsRouter)

// handlers
app.use(notfound)
app.use(errorhandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()