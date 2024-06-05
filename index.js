import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRouter from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000;
const corsOptions = {
    origin : true,
    credentials : true 
}

//database connection
const connect = async() => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
      } catch (err) {
        console.error('MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you\'re trying to access the database from an IP that isn\'t whitelisted. Make sure your current IP address is on your Atlas cluster\'s IP whitelist:', err);
      }
}

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/tours",tourRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/reviews",reviewRoute)
app.use("/api/v1/bookings",bookingRoute)

app.listen(port, ()=>{
    connect();
    console.log('sever listening on port',port);
})