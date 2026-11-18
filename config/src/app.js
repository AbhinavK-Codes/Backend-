import express from "express";
const app = express();
app.use(express.json());
// routes import
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.route.js";
//routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
// example route : http://localhost:5000/api/v1/users/register
export default app;
