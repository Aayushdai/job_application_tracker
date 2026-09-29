import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import companyRoutes from "./routes/company.routes.js";
import authRoutes from "./routes/auth.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import documentRoutes from "./routes/document.routes.js";
import followUpRoutes from "./routes/followUp.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use("/api", apiLimiter);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Job Application Tracker API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/follow-ups", followUpRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

export default app;