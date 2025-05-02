"use client"
import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { getChatbotByName } from "@/services/chatbot"
import { getToken } from "@/helpers/auth"
import { askGemini } from "@/services/ai"

export default function Page() {
  const { name: ChatBotName } = useParams()
  const inputRef = useRef(null)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [botDetails, setBotDetails] = useState({ name: "", context: "" })

  useEffect(() => {
    if (!ChatBotName) return
    const token = getToken()
    getChatbotByName({ token, name: ChatBotName }).then((data) => {
      setBotDetails({ name: data.name, context: data.context })
    })
  }, [ChatBotName])

  const handleSend = async() => {
    const response =await askGemini({
      text:botDetails.name,
      context:botDetails.context,
    })
    const data = await response.json()
    const botMessage=data.response.candidates[0].content.parts[0].text
    if (!message.trim()) return

    const newMessages = [
      ...chatHistory,
      { role: "You", text: message },
      { role: "Bot", text: botMessage },
    ]
    setChatHistory(newMessages)
    setMessage("")
    inputRef.current?.focus()
  }

  return (
    <div>
      <h1>Chatbot: {botDetails.name}</h1>
      <p>Context: {botDetails.context}</p>

      {chatHistory.map((msg, idx) => (
        <p key={idx}>
          <strong>{msg.role}:</strong> {msg.text}
        </p>
      ))}

      <div>
        <input
          ref={inputRef}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
