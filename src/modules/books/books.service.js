import { getDB } from "../../DB/connection.js";

// Task 5: Insert single document into books
export async function insertBook(bookData) {
  const db = getDB();
  return await db.collection("books").insertOne(bookData);
}

// Task 6: Insert multiple documents into books
export async function insertBooksBatch(booksData) {
  const db = getDB();
  const docs = Array.isArray(booksData) ? booksData : booksData?.books || [];
  return await db.collection("books").insertMany(docs);
}

// Task 8: Update book by title
export async function updateBookByTitle(title, updateData) {
  const db = getDB();
  const updateDoc = updateData && Object.keys(updateData).length > 0
    ? updateData
    : { year: 2022 };
  return await db.collection("books").updateOne(
    { title },
    { $set: updateDoc }
  );
}

// Task 9: Find book by title (query param)
export async function findBookByTitle(title) {
  const db = getDB();
  return await db.collection("books").findOne({ title });
}

// Task 10: Find books published within a range
export async function findBooksByYearRange(from, to) {
  const db = getDB();
  return await db.collection("books").find({
    year: { $gte: Number(from), $lte: Number(to) }
  }).toArray();
}

// Task 11: Find books by genre
export async function findBooksByGenre(genre) {
  const db = getDB();
  return await db.collection("books").find({ genres: genre }).toArray();
}

// Task 12: Skip 2, limit 3, sort by year descending (-1)
export async function getBooksSkipLimit() {
  const db = getDB();
  return await db.collection("books")
    .find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
}

// Task 13: Find by BSON type (Integer)
export async function findBooksByYearInteger() {
  const db = getDB();
  return await db.collection("books").find({
    year: { $type: "int" }
  }).toArray();
}

// Task 14: Exclude genres Horror and Science Fiction
export async function findBooksExcludeGenres() {
  const db = getDB();
  return await db.collection("books").find({
    genres: { $nin: ["Horror", "Science Fiction"] }
  }).toArray();
}

// Task 15: Delete books before a year
export async function deleteBooksBeforeYear(year) {
  const db = getDB();
  return await db.collection("books").deleteMany({
    year: { $lt: Number(year) }
  });
}

// Task 16: Aggregation: Filter (year > 2000) and sort descending
export async function aggregateFilterAndSort() {
  const db = getDB();
  return await db.collection("books").aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]).toArray();
}

// Task 17: Aggregation: Project fields (exclude _id, include title, author, year)
export async function aggregateProjectFields() {
  const db = getDB();
  return await db.collection("books").aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { _id: 0, title: 1, author: 1, year: 1 } }
  ]).toArray();
}

// Task 18: Aggregation: Unwind genres array
export async function aggregateUnwindGenres() {
  const db = getDB();
  return await db.collection("books").aggregate([
    { $unwind: "$genres" }
  ]).toArray();
}

// Task 19: Aggregation: Lookup join with logs collection
export async function aggregateLookupLogs() {
  const db = getDB();
  return await db.collection("books").aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "bookId",
        as: "logs"
      }
    }
  ]).toArray();
}
