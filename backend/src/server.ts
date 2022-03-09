import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import * as dotenv from "dotenv";
import compression from "compression";
import { initializeConnection } from "./config/db.config";
import { router as authRoute } from "./routes/auth.routes";
import { router as profileRoute } from "./routes/user.routes";
dotenv.config({ path: __dirname + "/.env" });

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(compression());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", profileRoute);

initializeConnection();

const port = process.env.port || 2000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
