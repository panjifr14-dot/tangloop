// Vercel Serverless Function entry point
// Connects Vercel's Edge/Node handler directly to the Express application
const app = require("../backend/src/app");

module.exports = app;
