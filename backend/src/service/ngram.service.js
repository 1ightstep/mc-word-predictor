const NgramModel = require("../models/ngram.model");

async function predictNextWords(context, limit = 3) {
  if (!context || !context.trim()) {
    return [];
  }

  let currContext = context.trim().split(" ");
  let predictions = [];
  while (currContext.length > 0) {
    const queryContext = currContext.join(" ");
    const currPredictions = await NgramModel.find({ context: queryContext })
      .sort({ frequency: -1 })
      .limit(limit)
      .select("context next frequency -_id");

    if (currPredictions.length >= limit || currContext.length === 1) {
      predictions.push(...currPredictions);
      predictions = predictions.slice(0, limit);
      return predictions;
    }

    predictions.push(...currPredictions);
    currContext = currContext.slice(1);
  }

  return [];
}

async function insertNgram(context, nextWord) {
  const existingNgram = await NgramModel.findOne({
    context: context,
    next: nextWord,
  });
  if (existingNgram) {
    existingNgram.frequency += 1;
    await existingNgram.save();
  } else {
    const newNgram = new NgramModel({
      context: context,
      next: nextWord,
      frequency: 1,
    });
    await newNgram.save();
  }
}

module.exports = {
  predictNextWords,
  insertNgram,
};
