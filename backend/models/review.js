const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
name: {type: String, required: true },
rating: { type: Number, min: 1, max: 5, required: true },
comment: {type: String, required: true },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Review", ReviewSchema);