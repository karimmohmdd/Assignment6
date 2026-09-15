import { Router } from "express";
import {
  insertBook,
  insertBooksBatch,
  updateBookByTitle,
  findBookByTitle,
  findBooksByYearRange,
  findBooksByGenre,
  getBooksSkipLimit,
  findBooksByYearInteger,
  findBooksExcludeGenres,
  deleteBooksBeforeYear,
  aggregateFilterAndSort,
  aggregateProjectFields,
  aggregateUnwindGenres,
  aggregateLookupLogs
} from "./books.service.js";

const booksRouter = Router();

// 5. Insert single document
// POST /books
booksRouter.post("/", async (req, res, next) => {
  try {
    const result = await insertBook(req.body);
    return res.status(201).json({
      message: "Book inserted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// 6. Insert multiple documents
// POST /books/batch
booksRouter.post("/batch", async (req, res, next) => {
  try {
    const result = await insertBooksBatch(req.body);
    return res.status(201).json({
      message: "Batch books inserted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// 9. Find book by title (query param)
// GET /books/title?title=Brave New World
booksRouter.get("/title", async (req, res, next) => {
  try {
    const { title } = req.query;
    const book = await findBookByTitle(title);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book found successfully",
      data: book
    });
  } catch (error) {
    next(error);
  }
});

// 10. Find books published within a range
// GET /books/year?from=1990&to=2010
booksRouter.get("/year", async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const books = await findBooksByYearRange(from, to);
    return res.status(200).json({
      message: "Books published within range retrieved successfully",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 11. Find books by genre
// GET /books/genre?genre=Science Fiction
booksRouter.get("/genre", async (req, res, next) => {
  try {
    const { genre } = req.query;
    const books = await findBooksByGenre(genre);
    return res.status(200).json({
      message: "Books by genre retrieved successfully",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 12. Skip, limit, and sort
// GET /books/skip-limit
booksRouter.get("/skip-limit", async (req, res, next) => {
  try {
    const books = await getBooksSkipLimit();
    return res.status(200).json({
      message: "Books retrieved (skip 2, limit 3, sorted by year desc)",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 13. Find by BSON type (Integer)
// GET /books/year-integer
booksRouter.get("/year-integer", async (req, res, next) => {
  try {
    const books = await findBooksByYearInteger();
    return res.status(200).json({
      message: "Books with year as integer retrieved successfully",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 14. Exclude genres (NOT Horror or Science Fiction)
// GET /books/exclude-genres
booksRouter.get("/exclude-genres", async (req, res, next) => {
  try {
    const books = await findBooksExcludeGenres();
    return res.status(200).json({
      message: "Books excluding specified genres retrieved successfully",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 15. Delete books before a year
// DELETE /books/before-year?year=2000
booksRouter.delete("/before-year", async (req, res, next) => {
  try {
    const { year } = req.query;
    const result = await deleteBooksBeforeYear(year);
    return res.status(200).json({
      message: `Books published before year ${year} deleted successfully`,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// 16. Aggregation: Filter and sort
// GET /books/aggregate1
booksRouter.get("/aggregate1", async (req, res, next) => {
  try {
    const books = await aggregateFilterAndSort();
    return res.status(200).json({
      message: "Aggregation 1: filtered after 2000 and sorted by year desc",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 17. Aggregation: Project fields
// GET /books/aggregate2
booksRouter.get("/aggregate2", async (req, res, next) => {
  try {
    const books = await aggregateProjectFields();
    return res.status(200).json({
      message: "Aggregation 2: projected fields (title, author, year)",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 18. Aggregation: Unwind array
// GET /books/aggregate3
booksRouter.get("/aggregate3", async (req, res, next) => {
  try {
    const books = await aggregateUnwindGenres();
    return res.status(200).json({
      message: "Aggregation 3: unwound genres array",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 19. Aggregation: Lookup join
// GET /books/aggregate4
booksRouter.get("/aggregate4", async (req, res, next) => {
  try {
    const books = await aggregateLookupLogs();
    return res.status(200).json({
      message: "Aggregation 4: lookup join with logs collection",
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// 8. Update book by title
// PATCH /books/:title
booksRouter.patch("/:title", async (req, res, next) => {
  try {
    const { title } = req.params;
    const result = await updateBookByTitle(title, req.body);
    return res.status(200).json({
      message: `Book '${title}' updated successfully`,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

export default booksRouter;
