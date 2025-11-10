import { predictNextWords } from "../service/ngram.service.js";

async function predict(req, res) {
  const { query, limit } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Invalid input query." });
  }

  const predictions = await predictNextWords(query, limit || 5);

  return res.status(200).json({ predictions });
}

export { predict };
