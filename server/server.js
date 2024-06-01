const express = require("express")
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors")


const app = express()
const PORT = process.env.PORT || 8000;
const routes = require('./routers/routes')
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Connected To MongoDB...`))
    .catch((err) => console.log(err))
app.use(routes)
app.listen(PORT, () => console.log(`Listening on: ${PORT}`));

