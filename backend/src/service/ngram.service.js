const NgramModel = require("../models/ngram.model");

async function predictNextWords(context, limit = 5) {
  if (!context || !context.trim()) {
    return [];
  }

  let currContext = context.trim().split(" ");

  while (currContext.length > 0) {
    const queryContext = currContext.join(" ");
    const predictions = await NgramModel.find({ context: queryContext })
      .sort({ frequency: -1 })
      .limit(limit)
      .select("next frequency -_id");

    if (predictions.length > 0) {
      return predictions;
    }

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
