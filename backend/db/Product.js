const mongoose = require("mongoose");

const notionSchema = new mongoose.Schema({
  id: String,
  token: String,
  category: String,
  userId: String,
});

module.exports = mongoose.model("notions", notionSchema);
