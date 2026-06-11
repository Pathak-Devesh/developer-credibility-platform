const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db");

const app = express();
const port= process.env.PORT;

app.get('/', (req,res) => {
    res.send("Hello World!!");
});

app.get('/api/health',(req,res) =>{
    res.json({
        sucess: true,
        message: "Server is running"
    });
});

connectDB();

app.listen(port,(req,res) =>{
    console.log(`Server started at port: ${port}`);
});