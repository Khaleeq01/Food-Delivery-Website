import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port =  4000;


// middlewares
app.use(express.json())
app.use(cors({
    origin:"https://food-delivery-website-gamma.vercel.app",
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
    }));

// Custom middleware to log request headers and handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://food-delivery-website-gamma.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log('Request Headers:', req.headers);
    next();
});

// Handle preflight (OPTIONS) requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://food-delivery-website-gamma.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.send();
});

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
