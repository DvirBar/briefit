import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));

const port = parseInt(<string>process.env.PORT) || 7000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
