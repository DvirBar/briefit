import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app: Application = express();

dotenv.config({
    path: path.resolve("env", `.env.${process.env.NODE_ENV}`)
});


// Pre routing middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// Routers
import auth from "./api/auth/router";
import errorHandler from "./middleware/errorHandler";

app.use("/api/auth", auth);

// Post routing middlewares
app.use(errorHandler);

const port = parseInt(<string>process.env.PORT) || 7000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

const db = process.env.MONGO_URI;

if(db) {
    console.log("Connecting to database...");
    
    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error(err));
}

else {
    console.error("No database connection string provided");
}
