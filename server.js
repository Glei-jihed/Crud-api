require('dotenv').config();
const express = require('express');
const {connectDb}=require('./src/services/mongoose');
const User = require('./src/models/user');
const userRoutes = require('./src/routes/user');
const app = express();
const port = process.env.PORT || 2000;


connectDb().catch(err=>console.log(err));



app.use(express.json());
app.use(userRoutes);





app.listen(port,()=>{
    console.log(`you Server  is running at http://localhost:${port}`);
});