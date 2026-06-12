const express = require('express');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

require('dotenv').config();

const app = express();
const port= process.env.PORT;

connectDB();

app.use(express.json()); 

app.use("/api/auth",authRoutes);

app.use("/api/user", userRoutes);



app.get('/', (req,res) => {
    res.send("Hello World!!");
});

app.get('/api/health',(req,res) =>{
    res.json({
        sucess: true,
        message: "Server is running"
    });
});


app.listen(port,(req,res) =>{
    console.log(`Server started at port: ${port}`);
});