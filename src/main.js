import express from "express";
import { connectDB } from "./DB/connection.js";
import authController from "./modules/auth/auth.controller.js";
import collectionController from "./modules/collection/collection.controller.js";
import booksController from "./modules/books/books.controller.js";
import globalErrMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import { PORT } from "./config/config.js";

async function bootstrap() {
  const app = express();

  app.use(express.json());

  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to MongoDB on startup:", error.message);
  }

  app.use("/users", authController);
  app.use("/collection", collectionController);
  app.use("/books", booksController);

  app.all("{/*dummy}", notFoundMiddleware);

  app.use(globalErrMiddleware);

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
}

bootstrap();
