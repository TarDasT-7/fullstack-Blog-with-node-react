

import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"

import mongoConection from "./mongoConection.js";

// bring routes
import blogRoutes from "./routes/blog.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";


// app
const app = express();


// db
mongoConection();


// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// cors
if (process.env.NODE_ENV === 'development') {
    const corsOptions ={
        origin:`${process.env.CLIENT_URL}`, 
        credentials:true,
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));
}



// routes middleware
app.use('/api', authRoutes);
app.use('/api', blogRoutes);
app.use('/api', userRoutes);


// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.clear()
    console.log(`Server is running on port ${port}`);
})






