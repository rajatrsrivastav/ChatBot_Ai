import mongoose from "mongoose";
const chatBotSchema = mongoose.Schema({
  name: { type: "String", unique: true, required: true },
  context: { type: "String", required: true },
  creator: { type: "String", required: true },
});
const ChatBot = mongoose.models.ChatBot ||  mongoose.model("ChatBot", chatBotSchema);

export default ChatBot;
