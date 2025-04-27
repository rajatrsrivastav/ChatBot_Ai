"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import "./chatbot.css"

export default function ChatbotPage() {
  const { name } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content: `Hi there! I'm ${name}. How can I help you today?`,
      },
    ])
  }, [name])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const botMessage = {
        role: "bot",
        content: `As ${name}, I'm processing your request: "${input}". In a complete implementation, I would provide a relevant response based on my training context.`,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>{name}</h1>
        <p>Chat with your AI assistant</p>
      </div>

      <div className="chatbot-chat-window">
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${message.role === "user" ? "chatbot-user-message" : "chatbot-bot-message"}`}
            >
              <div className="chatbot-message-content">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
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

        <form onSubmit={handleSendMessage} className="chatbot-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
