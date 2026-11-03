// Vercel Serverless Function Entry Point for TANG-LOOP
let app;
try {
  app = require("../backend/src/app");
} catch (err) {
  console.error("FATAL ERROR: Failed to load backend/src/app:", err);
}

module.exports = (req, res) => {
  if (!app) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({
      error: "Backend initialization failed",
      message: "Please check Vercel function runtime logs"
    }));
  }

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res.end();
  }

  return app(req, res);
};
