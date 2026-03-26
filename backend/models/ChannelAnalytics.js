const mongoose = require("mongoose");

const AnalyticsHistorySchema = new mongoose.Schema({
  subscribers:Number,
  views:Number,
  videos:Number,
  date:{type:Date, default:Date.now}
});

const ChannelSchema = new mongoose.Schema({
  channelId:String,
  title:String,
  description:String,
  thumbnail:String,
  analyticsHistory:[AnalyticsHistorySchema],
  createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model("ChannelAnalytics", ChannelSchema);
