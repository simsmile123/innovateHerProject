const express = require("express");
const cors = require("cors");
const scrapeAbortionData = require("./scraper");

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS

// Endpoint to fetch abortion data
app.get("/api/abortion-data", async (req, res) => {
  try {
    const data = await scrapeAbortionData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching abortion data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
