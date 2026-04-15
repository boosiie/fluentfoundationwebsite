import { Link } from 'react-router-dom';
import '../css/AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="about-hero">
        <span className="about-hero-eyebrow">Our Story</span>
        <h1>
          Building <em>bridges</em> through<br />language & understanding
        </h1>
        <p className="about-hero-sub">
          Fluent Foundation is dedicated to making language learning accessible,
          engaging, and deeply human — for every learner, everywhere.
        </p>

        {/* wave divider */}
        <div className="about-hero-wave">
          <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 72 C360 0 1080 0 1440 72 L1440 72 L0 72 Z" fill="#F4FBFF"/>
          </svg>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="about-mission">
        <div className="about-mission-inner">
          <div className="about-mission-text">
            <h2>Why we <span>exist</span></h2>
            <p>
              Language is more than words — it's connection, opportunity, and identity.
              We believe that access to high-quality language education shouldn't depend
              on where you were born or how much you can afford.
            </p>
            <p>
              Fluent Foundation was built to close that gap: a free, community-driven
              platform where learners grow at their own pace, guided by thoughtful
              content and a supportive community.
            </p>
          </div>
          <div className="about-mission-visual">
            <div className="about-stat-card">
              <span className="about-stat-number">10k+</span>
              <span className="about-stat-label">Active learners worldwide</span>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-number">100%</span>
              <span className="about-stat-label">Free, always</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="about-values">
        <div className="about-section-header">
          <h2>What we stand for</h2>
          <p>Three principles guide every decision we make — from the quiz questions we write to the community we nurture.</p>
        </div>
        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="about-value-icon blue">🌊</div>
            <h3>Accessibility First</h3>
            <p>Every feature we build is tested for inclusivity. No paywalls, no barriers — just learning for everyone.</p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon green">🌱</div>
            <h3>Growth Over Perfection</h3>
            <p>We celebrate progress, not scores. Mistakes are part of the process, and our platform embraces that.</p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon purple">✨</div>
            <h3>Community Driven</h3>
            <p>Our content, direction, and culture are shaped by the learners and contributors who make up this community.</p>
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="profiles-section">
        <div className="about-section-header">
          <h2>Meet the team</h2>
          <p>A small group of passionate people building something they believe in.</p>
        </div>
        <div className="profiles-container">
          <div className="profile-card">
            <div className="profile-avatar">A</div>
            <h3>Profile Name</h3>
            <span className="profile-role">Founder</span>
            <p>Short introduction or bio goes here. Replace with real content when ready.</p>
          </div>
          <div className="profile-card">
            <div className="profile-avatar">B</div>
            <h3>Profile Name</h3>
            <span className="profile-role">Contributor</span>
            <p>Short introduction or bio goes here. Replace with real content when ready.</p>
          </div>
          <div className="profile-card">
            <div className="profile-avatar">C</div>
            <h3>Profile Name</h3>
            <span className="profile-role">Developer</span>
            <p>Short introduction or bio goes here. Replace with real content when ready.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="about-cta">
        <h2>Ready to start learning?</h2>
        <p>Jump into a quiz, explore our content, or get in touch — we'd love to hear from you.</p>
        <Link to="/quiz" className="about-cta-btn">
          Start a Quiz →
        </Link>
      </section>

    </div>
  );
}

export default AboutPage;