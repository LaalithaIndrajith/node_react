import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

// Creating an instance of the Express app
const app = express();

// Configuring the app to use CORS middleware
app.use(
    cors({
        credentials: true, // Allow credentials (cookies, etc.) to be sent with requests
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Creating the HTTP server using Express app
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// Starting the server to listen on port 8080
server.listen(port, () => {
    console.log("Server running on http://localhost:8080/");
});

// Registering the router for the app
app.use("/", router());