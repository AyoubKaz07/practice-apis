const { query } = require('express')
const Product = require('../models/product')


const GetALlProducts = async (req, res) => {
    // retrieve the propreties we only want from the query 
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {}

    // = featured won't work because it will be a string
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regex = /\b(<|>|=|>=|<=)\b/g
        let filters = numericFilters.replace(
            regex,
            (match) => `-${operatorMap[match]}-`
        )
        // my only numeric proprities
        const numericprops = ['price', 'rating']
        filters = filters.split(',').forEach((item) =>{
            const [field, operator, value] = item.split('-')
            if (numericprops.includes(field)){
                queryObject[field] = { [operator]:Number(value) }
            }
        })
    }
    
    let result = Product.find(queryObject)
    if (sort) {
        const sortparams = sort.split(',').join(' ')
        result = result.sort(sortparams)
    }
    else {
        result = result.sort('createdAt')
    }
    if (fields) {
        const fieldsparams = fields.split(',').join(' ')
        result = result.select(fieldsparams)
    }
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits: products.length})
}

module.exports = GetALlProducts