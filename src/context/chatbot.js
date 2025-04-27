"use client";

import { createContext, useState } from "react";

export const ChatbotContext = createContext(null);

const ChatbotProvider = ({ children }) => {
  const [chatbots, setChatbots] = useState([]);

  return (
    <ChatbotContext.Provider value={{ chatbots, setChatbots }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
