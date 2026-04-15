import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS } from '../data/lessons.js';
import '../css/CoursesPage.css';

function LevelCard({ level, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const navigate = useNavigate();

  return (
    <div className="level-card">
      <button
        className="level-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span
          className="level-stripe"
          style={{ background: level.color }}
        />
        <span className="level-emoji">{level.emoji}</span>
        <div className="level-text">
          <h2>{level.label}</h2>
          <p>{level.description}</p>
        </div>
        <div className="level-meta">
          <span className="level-count">{level.lessons.length} lessons</span>
          <span className={`level-chevron ${open ? 'open' : ''}`}>▾</span>
        </div>
      </button>

      <div className={`level-lessons ${open ? 'open' : ''}`}>
        <div className="level-lessons-inner">
          {level.lessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              className="lesson-row"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              onKeyDown={e => e.key === 'Enter' && navigate(`/lesson/${lesson.id}`)}
            >
              <span
                className="lesson-number"
                style={{ background: level.color }}
              >
                {idx + 1}
              </span>
              <div className="lesson-info">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </div>
              <span className="lesson-duration">{lesson.duration}</span>
              <span className="lesson-arrow">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesPage() {
  return (
    <div className="courses-page">
      <section className="courses-hero">
        <span className="courses-hero-eyebrow">All Courses</span>
        <h1>What do you want to learn?</h1>
        <p>
          Choose your level and dive in. Each lesson includes a video
          and a short quiz to reinforce what you've learned.
        </p>
        <div className="courses-hero-wave">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 56 C480 0 960 0 1440 56 L1440 56 L0 56 Z" fill="#F4FBFF"/>
          </svg>
        </div>
      </section>

      <div className="courses-body">
        {LEVELS.map((level, idx) => (
          <LevelCard
            key={level.id}
            level={level}
            defaultOpen={idx === 0} 
          />
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
