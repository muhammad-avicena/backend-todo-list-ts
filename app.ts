import "dotenv/config";
import express, { Application } from "express";
import useMiddleware from "./middleware";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

const app: Application = express();
const PORT = parseInt(process.env.SERVER_PORT as string, 10) || 8080;

// Middleware
useMiddleware(app);

// Error handler
app.use(errorHandlerMiddleware);

// App listeners
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

export default app;
