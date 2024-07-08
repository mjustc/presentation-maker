import express from "express";
import cors from "cors";
import presentationRoutes from "./routes/presentation";
import pageRoutes from "./routes/page";
import loggerMiddleware from "./utils/logger";
import errorHandler from "./middelware/errorHandler";
import { initializePresentations } from "./database/inMemoryStorage";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(loggerMiddleware);
const allowedOrigins = ["http://localhost:3001"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

initializePresentations();

app.use("/api/v1", presentationRoutes);
app.use("/api/v1", pageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
