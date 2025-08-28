import express from "express";

const app = express();

// 404 handler
app.use((req, res) => res.status(404).send("404 - Page Not Found"));

export default app;
