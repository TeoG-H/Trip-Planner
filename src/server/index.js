import express from "express";
import cors from "cors";
import { callGemini } from "./ai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-trip", async (req, res) => {
  try {
    const { prompt } = req.body;
    const text = await callGemini(prompt);
    res.send(text);
  } catch (e) {
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});