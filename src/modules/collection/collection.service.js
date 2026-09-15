import { getDB } from "../../DB/connection.js";

// Task 1: Create explicit collection with validation
export async function createBooksCollection() {
  const db = getDB();
  const collection = await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "must be a non-empty string and is required"
          }
        }
      }
    }
  });
  return collection;
}

// Task 2: Create implicit collection
export async function createAuthorsImplicit() {
  const db = getDB();
  const result = await db.collection("authors").insertOne({
    name: "Author1",
    nationality: "British"
  });
  return result;
}

// Task 3: Create capped collection
export async function createLogsCapped() {
  const db = getDB();
  const result = await db.createCollection("logs", {
    capped: true,
    size: 1048576
  });
  return result;
}

// Task 4: Create index
export async function createBooksIndex() {
  const db = getDB();
  const result = await db.collection("books").createIndex({ title: 1 });
  return result;
}
