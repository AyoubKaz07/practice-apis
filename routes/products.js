const GetALlProducts = require('../controllers/products')
const express = require('express')
const router = express.Router()

router.route('/').get(GetALlProducts)

module.exports = router