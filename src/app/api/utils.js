import Token from "@/models/token";
import ChatBot from "@/models/chatbots";
import { createConnection } from "@/config/db";
await createConnection();

export const verifyToken = async (token) => {
  return await Token.findOne({ token });
};

export const createChatbot = async ({ name, context, email }) => {
  const newChatBot = new ChatBot({ name, creator: email, context });
  return newChatBot.save();
};

export const getChatbotByCreator = async (email) => {
  return await ChatBot.find({ creator: email });
};

export const getAllChatBots = async () => {
  const data = await ChatBot.find();
  return data;
};

export const getChatbotByName = async (name) => {
  const data = await ChatBot.findOne({ name });
  return data;
};
