"use client";
import { useState, useEffect } from "react";
import "./explore.css";
import { getAllChatBots } from "@/services/explore";
import { useRouter } from "next/navigation";

const Explore = () => {
  const [allChatbot, setAllChatbot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getAllChatBots()
      .then((res) => res.json())
      .then((data) => {
        setAllChatbot(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="explore-container">
      <div className="explore_main">
        <div className="explore">
          <div className="explore_text">
            <h1>Explore</h1>
            <p>Discover featured chatbots and templates</p>
          </div>
        </div>

        {isLoading ? (
          <div className="explore_skeleton_container">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="explore_skeleton_item">
                <div className="explore_skeleton_title"></div>
                <div className="explore_skeleton_context"></div>
                <div className="explore_skeleton_info"></div>
                <div className="explore_skeleton_info"></div>
                <div className="explore_skeleton_button"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="chatbot-items">
            {allChatbot.map((bot, idx) => (
              <div key={bot.name + idx} className="chatbot-item">
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
                <button
                  onClick={() => router.push(`/chatbot/${bot.name}`)}
                  className="chat-button"
                >
                  Try it
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
