import "./about.css"

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About PeerBot</h1>
        <p>Your AI-powered assistant platform for instant guidance and support</p>
      </section>

      <section className="about-mission">
        <div className="about-mission-content">
          <h2>Our Mission</h2>
          <p>
            PeerBot was created to democratize access to guidance and support. We believe that everyone—from junior
            employees and interns to solo entrepreneurs—should have instant access to the help they need, when they need
            it.
          </p>
          <p>
            Our platform enables anyone to create custom AI assistants tailored to specific needs, workflows, and
            knowledge domains, making expertise accessible to all.
          </p>
        </div>
      </section>

      <section className="about-vision">
        <div className="about-vision-content">
          <h2>Our Vision</h2>
          <p>
            We're building PeerBot to be the go-to platform for personalized AI assistance. Our current focus is on
            providing instant guidance for individuals, but our roadmap includes:
          </p>
          <ul className="about-vision-list">
            <li>Company-specific integrations to connect with your existing tools</li>
            <li>Team knowledge workflows for collaborative bot creation and management</li>
            <li>Advanced customization options for specialized use cases</li>
            <li>Enterprise-grade security and compliance features</li>
          </ul>
        </div>
      </section>

      <section className="about-how-it-works">
        <h2>How PeerBot Works</h2>
        <div className="about-process">
          <div className="about-process-step">
            <div className="about-step-number">1</div>
            <div className="about-step-content">
              <h3>Create Your Bot</h3>
              <p>Define your bot's purpose and provide context about what it should know and how it should respond.</p>
            </div>
          </div>
          <div className="about-process-step">
            <div className="about-step-number">2</div>
            <div className="about-step-content">
              <h3>Instant Deployment</h3>
              <p>Your bot is immediately available for use—no complex setup or training required.</p>
            </div>
          </div>
          <div className="about-process-step">
            <div className="about-step-number">3</div>
            <div className="about-step-content">
              <h3>Get Guidance</h3>
              <p>
                Start chatting with your bot to get instant, personalized assistance based on the context you provided.
              </p>
            </div>
          </div>
          <div className="about-process-step">
            <div className="about-step-number">4</div>
            <div className="about-step-content">
              <h3>Share & Collaborate</h3>
              <p>Share your bots with others who need similar guidance or explore bots created by the community.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to experience PeerBot?</h2>
        <p>Create your first AI assistant in minutes and start getting the guidance you need.</p>
        <div className="about-cta-buttons">
          <a href="/auth/signup" className="about-primary-button">
            Get Started
          </a>
          <a href="/explore" className="about-secondary-button">
            Explore Bots
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
