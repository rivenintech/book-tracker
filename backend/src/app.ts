import express from "express";
import booksRoutes from "./routes";

const app = express();

app.use(express.json());
app.use("/api/books", booksRoutes);

// 404 handler
app.use((req, res) => res.status(404).send("404 - Page Not Found"));

export default app;
