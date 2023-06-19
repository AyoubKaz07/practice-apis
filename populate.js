/* Adds prodcuts from json to the database */

require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        // in case we already have some documents in the collection
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('yess')
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

start()