import express from "express";
const app = express();
app.use(express.json());
// routes import
import userRoutes from "./routes/user.routes.js";
//routes declaration
app.use("/api/v1/users", userRoutes);
// example route : http://localhost:5000/api/v1/users/register
export default app;
