import { Router } from "express";
import {
  createBooksCollection,
  createAuthorsImplicit,
  createLogsCapped,
  createBooksIndex,
} from "./collection.service.js";

const collectionRouter = Router();

// 1. Create explicit collection with validation
// POST /collection/books
collectionRouter.post("/books", async (req, res, next) => {
  try {
    await createBooksCollection();
    return res.status(201).json({
      message:
        "Explicit collection 'books' created with validation successfully",
    });
  } catch (error) {
    next(error);
  }
});

// 2. Create implicit collectionبي
// POST /collection/authors
collectionRouter.post("/authors", async (req, res, next) => {
  try {
    const result = await createAuthorsImplicit();
    return res.status(201).json({
      message: "Implicit collection 'authors' created with document",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// 3. Create capped collection
// POST /collection/logs/capped
collectionRouter.post("/logs/capped", async (req, res, next) => {
  try {
    await createLogsCapped();
    return res.status(201).json({
      message:
        "Capped collection 'logs' created successfully with size limit 1MB",
    });
  } catch (error) {
    next(error);
  }
});

// 4. Create index
// POST /collection/books/index
collectionRouter.post("/books/index", async (req, res, next) => {
  try {
    const indexName = await createBooksIndex();
    return res.status(200).json({
      message: "Ascending index on 'title' created successfully",
      index: indexName,
    });
  } catch (error) {
    next(error);
  }
});

export default collectionRouter;
