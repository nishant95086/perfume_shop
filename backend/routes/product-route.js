const express = require('express');
const {getAllProducts,getsingleProduct} = require('../controllers/product-controllers');
const router = express.Router();

router.get('/',getAllProducts);
router.get('/:id',getsingleProduct);

module.exports = router;