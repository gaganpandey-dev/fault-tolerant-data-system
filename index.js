const express = require("express");
const path = require("path");
const ingestEvent = require("./ingestion");
const store = require("./store");

const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// API Endpoints
app.post("/events", ingestEvent);
app.get("/aggregates", (req, res) => res.json(store.aggregates));
app.get("/processed", (req, res) => res.json(store.processedEvents));
app.get("/failed", (req, res) => res.json(store.failedEvents));

// Optional: fallback route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
