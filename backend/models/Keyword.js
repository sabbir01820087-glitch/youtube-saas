const mongoose = require("mongoose");

const RankHistorySchema = new mongoose.Schema({
  rank:Number,
  date:{type:Date, default: Date.now}
});

const KeywordSchema = new mongoose.Schema({
  title:String,
  generatedKeywords:[String],
  rankHistory:[RankHistorySchema],
  language:{type:String, default:"en"},
  source:{type:String, enum:["user","auto"], default:"user"},
  createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model("Keyword", KeywordSchema);
