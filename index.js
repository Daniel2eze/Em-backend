require("dotenv/config")
const express = require("express");
const app = express();
const port = process.env.PORT || 5785;
const connect =require('./config/DB');
const authRoute = require('./routes/authRoutes');
const userRoute = require("./routes/userRoute")
const cors = require("cors")
const cloudinary = require('cloudinary').v2;
const fileUpload = require("express-fileupload");

// custom middewears
app.use(fileUpload({useTempFiles: true}));
app.use(express.json())
app.use(cors());



// API's


app.use('/api/vi/auth',authRoute);
app.use('/api/v1/users',userRoute);

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
})

// server and DB connection
connect()
.then(()=> {
    try {
        app.listen(port,()=>{
            console.log(`EM-server is connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log('can not connect to the Em server');
    }

})
.catch((error)=>{
    console.log("invalid database connection...", error);
})

// routes
app.get('/,',(req,res)=>{
    res.json({success:true, message:'Em server is live'})
})

app.use((req,res)=>{
    res.status(404).json({success:false,message:"route doesnt exixt"})
})