const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const schema = require("../db/schema");
require("dotenv").config();

let db = null;
let isMock = true;

const connectionString = process.env.DATABASE_URL;

if (connectionString && !connectionString.includes("mock")) {
  try {
    const pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false }
    });
    db = drizzle(pool, { schema });
    isMock = false;
    console.log(" Connected to PostgreSQL database via Drizzle ORM");
  } catch (err) {
    console.warn("⚠️ Database connection failed, falling back to active in-memory state engine:", err.message);
  }
} else {
  console.log("ℹ️ No DATABASE_URL specified. Running with active in-memory state engine (ready for Vercel & Neon DB).");
}

module.exports = {
  db,
  isMock,
  schema
};

