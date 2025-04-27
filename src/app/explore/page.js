"use client"
import { useState, useEffect } from "react"
import "./explore.css"
import { getAllChatBots } from "@/services/explore"
import { useRouter } from "next/navigation"

const Explore = () => {
  const [allChatbot, setAllChatbot] = useState([])
  const router = useRouter()

  useEffect(() => {
    getAllChatBots()
      .then((res) => res.json())
      .then((data) => setAllChatbot(data))
  }, [])

  return (
    <div className="explore-container">
      <div className="explore_main">
        <div className="explore">
          <div className="explore_text">
            <h1>Explore</h1>
            <p>Discover featured chatbots and templates</p>
          </div>
        </div>
        <div className="chatbot-items">
          {allChatbot.map((bot, idx) => (
            <div key={bot.name + "" + idx} className="chatbot-item">
              <div className="chatbot-info">
                <h3 className="chatbot-name">{bot.name}</h3>
                <p className="chatbot-context">{bot.context}</p>
                <div className="created">
                  <p>Category:</p>
                  <p>Business</p>
                </div>
                <div className="created">
                  <p>Created by:</p>
                  <p>user1</p>
                </div>
              </div>
              <button onClick={() => router.push(`/chatbot/${bot.name}`)} className="chat-button">
                Try it
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore
