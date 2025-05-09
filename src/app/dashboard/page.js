"use client"

import { useContext, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthContext } from "@/context/auth"
import { ChatbotContext } from "@/context/chatbot"
import { createChatBot, getChatBots } from "@/services/chatbot"
import { getToken } from "@/helpers/auth"

import "./Dashboard.css"

const Dashboard = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const { chatbots, setChatbots } = useContext(ChatbotContext)
  const [botName, setBotName] = useState("")
  const [botContext, setBotContext] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    getChatBots({ token: getToken() })
      .then((res) => {
        setChatbots(res)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [setChatbots]) 

  if (!isLoggedIn) {
    return (
      <div className="dashboard-not-logged-in">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-message">
            <p className="dashboard-error">You are not logged in</p>
            <Link href="/auth/login" className="dashboard-login-link">
              Click here to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddBot = async () => {
    if (botName.trim() === "" || botContext.trim() === "" || isCreating) return

    setIsCreating(true)
    try {
      const newBot = { name: botName, context: botContext }
      setChatbots((prev) => [...prev, newBot])
      await createChatBot({ name: botName, context: botContext, token: getToken() })

      setBotName("")
      setBotContext("")
    } catch (error) {
      console.error("Failed to create bot:", error)
      alert("Failed to create bot. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Chatbot Dashboard</h1>
      <div className="dashboard-form">
        <h2>Create a New Chatbot</h2>
        <div className="form-group">
          <label htmlFor="botName">Bot Name</label>
          <input
            type="text"
            id="botName"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter a name for your chatbot"
            disabled={isCreating}
          />
        </div>
        <div className="form-group">
          <label htmlFor="botContext">Bot Context</label>
          <textarea
            id="botContext"
            value={botContext}
            onChange={(e) => setBotContext(e.target.value)}
            placeholder="Describe what your chatbot should know and how it should respond"
            rows={5}
            disabled={isCreating}
          ></textarea>
        </div>
        <button className="add-bot-button" onClick={handleAddBot} disabled={isCreating}>
          {isCreating ? (
            <span className="dashboard_loading">
              <span className="dashboard_spinner"></span>
              Creating...
            </span>
          ) : (
            "Create Chatbot"
          )}
        </button>
      </div>

      <div className="dashboard-bots">
        <h2>Your Chatbots</h2>
        {isLoading ? (
          <div className="dashboard_skeleton_container">
            {[1, 2, 3].map((item) => (
              <div key={item} className="dashboard_skeleton_item">
                <div className="dashboard_skeleton_title"></div>
                <div className="dashboard_skeleton_context"></div>
                <div className="dashboard_skeleton_actions"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bot-list">
            {chatbots.length === 0 ? (
              <p className="no-bots">You have not created any chatbots yet.</p>
            ) : (
              chatbots.map((bot, index) => (
                <div key={index} className="bot-item">
                  <div className="bot-info">
                    <h3>{bot.name}</h3>
                    <p>{bot.context}</p>
                  </div>
                  <button onClick={() => router.push(`/chatbot/${bot.name}`)} className="chat-button">
                    Open Chat
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard