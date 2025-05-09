"use client"
import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { getChatbotByName } from "@/services/chatbot"
import { getToken } from "@/helpers/auth"
import { askGemini } from "@/services/ai"
import "./chatbot.css"

export default function Page() {
  const { name: ChatBotName } = useParams()
  const inputRef = useRef(null)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [botDetails, setBotDetails] = useState({ name: "", context: "" })
  const [isTyping, setIsTyping] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!ChatBotName) return
    const token = getToken()
    getChatbotByName({ token, name: ChatBotName }).then((data) => {
      setBotDetails({ name: data.name, context: data.context })
    })
  }, [ChatBotName])

  useEffect(() => {
    // Scroll to bottom whenever chat history changes
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  const handleSend = async() => {
    if (!message.trim() || isButtonDisabled) return
    
    setIsButtonDisabled(true)
    setIsTyping(true)
    
    // Add user message
    const userMessage = message
    setChatHistory(prev => [...prev, { role: "You", text: userMessage }])
    setMessage("")
    
    try {
      const response = await askGemini({
        text: botDetails.name,
        context: botDetails.context,
      })
      const data = await response.json()
      const botMessage = data.response.candidates[0].content.parts[0].text
      
      // Add bot response
      setChatHistory(prev => [...prev, { role: "Bot", text: botMessage }])
    } catch (error) {
      console.error("Error getting response:", error)
      setChatHistory(prev => [...prev, { role: "Bot", text: "Sorry, I encountered an error. Please try again." }])
    } finally {
      setIsTyping(false)
      // Re-enable button after a short delay
      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 500)
    }
    
    inputRef.current?.focus()
  }

  return (
    <div className="chatbotV2_wrapper">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h1>{botDetails.name}</h1>
          <p>Chat with your AI assistant</p>
        </div>

        <div className="chatbot-chat-window">
          <div className="chatbot-messages">
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`chatbot-message ${msg.role === "You" ? "chatbot-user-message" : "chatbot-bot-message"}`}
              >
                <div className="chatbot-message-content">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbot-message chatbot-bot-message">
                <div className="chatbot-message-content">
                  <div className="chatbot-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !message.trim() || isButtonDisabled}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}