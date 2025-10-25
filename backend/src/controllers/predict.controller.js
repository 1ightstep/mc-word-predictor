function predict(req, res) {
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Invalid input query." });
  }

  return res.status(200).json({ predictions: [predictions] });
}

module.exports = { predict };
