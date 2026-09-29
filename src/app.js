import express from "express";
import authRoutes from "./routes/auth.routes.js";
import {authenticate} from "./middleware/auth.middleware.js";
import companyRoutes from "./routes/company.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import applicationRoutes from "./routes/application.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import documentRoutes from "./routes/document.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import followUpRoutes from "./routes/followUp.routes.js";
const app = express();

app.use(express.json());


app.get("/api/health", (req, res) => {// asking if server is alive or working
    res.status(200).json({
        success: true,
        message: "Job Applcation Tracker API is running"
    });

});
app.get("/api/profile", authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: req.user
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/follow-ups", followUpRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(errorHandler);

export default app;