const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        require:[true, 'Must provide a product name']
    },
    price:{
        type: Number,
        require:[true, 'Must provide a product price']
    },
    featured:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: 3.5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    company:{
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{Value} is not available' 
        }
        //enum:['ikea', 'liddy', 'caressa', 'marcos']
    }
})

module.exports = mongoose.model('Product', ProductSchema)