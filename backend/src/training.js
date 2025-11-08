const fs = require("fs");
const path = require("path");
const { insertNgram, predictNextWords } = require("./service/ngram.service");
const connectDB = require("./config/db");
const { default: mongoose } = require("mongoose");

async function insertPhrase(phrase) {
  const phraseList = phrase.split(" ");
  for (let i = 0; i < phraseList.length - 1; i++) {
    for (let k = 0; k < phraseList.length - 1; k++) {
      if (k + i + 1 >= phraseList.length) continue;
      const context = phraseList.slice(k, k + i + 1).join(" ");
      const nextWord = phraseList[k + i + 1];
      console.log(`Inserting N-gram: [${context}] -> [${nextWord}]`);
      await insertNgram(context.toLowerCase(), nextWord.toLowerCase());
    }
  }
}

function readPhrasesFromFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const phrases = data.split("\n").filter((line) => line.trim() !== "");
  return phrases;
}

async function trainModelFromFile(filePath) {
  const phrases = readPhrasesFromFile(filePath);
  for (const phrase of phrases) {
    await insertPhrase(phrase);
  }
}

connectDB().then(async () => {
  console.log("Connected to DB. Starting training...");
  const word = await predictNextWords("<word here>");
  console.log(word);
  await mongoose.disconnect();
  console.log("Training complete. Disconnected from DB.");
  process.exit(0);
});
