import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import dotenv from "dotenv"
import connectToDB from "./models/DB_connection.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();

const app = express();


// Налаштування CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Підключення роутера
app.use(router);

// Парсер  Content-Type "application/json" для доступу до req.body
app.use(express.json());

// Парсер для обробки даних з форми з кодуванням application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// Парсер  для обробки JSON-даних.
// app.use(bodyParser.json());

// Парсер кук
app.use(cookieParser());

const startServer = async () => {
    try {
        await connectToDB();
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Express server startup error:', error);
    }
}

startServer();