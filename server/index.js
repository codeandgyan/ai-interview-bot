require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { processMessage } = require("./genAI");
const cors = require("cors");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/ai-interview", async (req, res) => {
  const { transcripts } = req.body;

  if (!transcripts) {
    res.status(400).json({ error: "transcripts not specified" });
    return;
  }

  try {
    const response = await processMessage(transcripts);
    res.json({ latestResponse: response });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to processMessage: ${error.message}` });
  }
});

app.get("/", async (req, res) => {
  res.json({ status: "up" });
});

app.listen(PORT, () => {
  console.log(
    `AI Interviewer Service running on port http://localhost:${PORT}.`
  );
});
