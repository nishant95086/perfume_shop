require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/product-route');
const reviewsRouter = require('./routes/review-route'); 
const connectdb = require('./database/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products',productsRouter);
app.use('/api/reviews',reviewsRouter);

connectdb();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server is running at http://localhost:'+PORT);
})