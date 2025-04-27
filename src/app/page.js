import "./home.css"

export default function Home() {
  return (
    <div className="homepage-container">
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <h1>Get Instant Guidance with PeerBot</h1>
          <p>Your AI-powered assistant for personalized help when you need it most</p>
          <div className="homepage-hero-buttons">
            <a href="/explore" className="homepage-primary-button">
              Explore Bots
            </a>
            <a href="/auth/login" className="homepage-secondary-button">
              Get Started
            </a>
          </div>
        </div>
        <div className="homepage-hero-image">
          <div className="homepage-image-placeholder">
            <div className="homepage-chat-bubble">
              <div className="homepage-chat-header">
                <span>PeerBot Assistant</span>
              </div>
              <div className="homepage-chat-messages">
                <div className="homepage-message homepage-user-message">
                  <p>How do I create a custom chatbot?</p>
                </div>
                <div className="homepage-message homepage-bot-message">
                  <p>
                    You can create a custom chatbot in just a few steps! Go to your Dashboard, click "Add Chatbot", then
                    give it a name and context. Your bot will be ready to use instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-features">
        <h2>Why Choose PeerBot?</h2>
        <div className="homepage-features-grid">
          <div className="homepage-feature-card">
            <div className="homepage-feature-icon">🚀</div>
            <h3>Instant Guidance</h3>
            <p>Get immediate help for junior employees, interns, or solo users without waiting for human assistance.</p>
          </div>
          <div className="homepage-feature-card">
            <div className="homepage-feature-icon">🔍</div>
            <h3>Personalized Assistance</h3>
            <p>Create custom chatbots tailored to specific needs, workflows, or knowledge domains.</p>
          </div>
          <div className="homepage-feature-card">
            <div className="homepage-feature-icon">🔄</div>
            <h3>Easy Integration</h3>
            <p>Coming soon: Connect with your company's tools and knowledge bases for enhanced capabilities.</p>
          </div>
          <div className="homepage-feature-card">
            <div className="homepage-feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Future updates will enable team knowledge workflows and shared bot management.</p>
          </div>
        </div>
      </section>

      <section className="homepage-use-cases">
        <h2>Popular Use Cases</h2>
        <div className="homepage-use-cases-grid">
          <div className="homepage-use-case">
            <h3>Customer Support</h3>
            <p>Handle customer inquiries and support tickets with automated responses based on your knowledge base.</p>
            <a href="/explore" className="homepage-use-case-link">
              Try it →
            </a>
          </div>
          <div className="homepage-use-case">
            <h3>Sales Assistant</h3>
            <p>Help with product recommendations and answer common sales inquiries to boost conversion.</p>
            <a href="/explore" className="homepage-use-case-link">
              Try it →
            </a>
          </div>
          <div className="homepage-use-case">
            <h3>Onboarding Guide</h3>
            <p>Create a personalized assistant to help new team members get up to speed quickly.</p>
            <a href="/explore" className="homepage-use-case-link">
              Try it →
            </a>
          </div>
        </div>
      </section>

      <section className="homepage-how-it-works">
        <h2>How It Works</h2>
        <div className="homepage-steps">
          <div className="homepage-step">
            <div className="homepage-step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up for PeerBot in seconds with just your email and password.</p>
          </div>
          <div className="homepage-step">
            <div className="homepage-step-number">2</div>
            <h3>Build Your Bot</h3>
            <p>Create a custom chatbot by giving it a name and context about its purpose.</p>
          </div>
          <div className="homepage-step">
            <div className="homepage-step-number">3</div>
            <h3>Start Chatting</h3>
            <p>Instantly use your bot or share it with others who need assistance.</p>
          </div>
        </div>
      </section>

      <section className="homepage-cta">
        <div className="homepage-cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Create your first chatbot in minutes and experience the power of instant AI guidance.</p>
          <div className="homepage-cta-buttons">
            <a href="/auth/signup" className="homepage-primary-button">
              Sign Up Free
            </a>
            <a href="/explore" className="homepage-secondary-button">
              Explore Templates
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
