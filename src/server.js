const express = require('express');
const app = express();
const connectDb = require('./config/db');
require('dotenv').config();
app.use(express.json());
const userManagementRoute = require('../src/routes/userManagementRoute');
app.use('/api',userManagementRoute);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
    connectDb();
});