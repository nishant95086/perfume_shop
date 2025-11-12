const express = require('express');
const router = express.Router();
const {addReview,getreviewsByProduct} = require('../controllers/review-controllers');

router.get('/:id',getreviewsByProduct);
router.post('/add/:id',addReview);

module.exports = router;