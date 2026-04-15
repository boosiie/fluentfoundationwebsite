import { useRef, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findLesson } from '../data/lessons.js';
import '../css/LessonPage.css';

/* ─────────────────────────────────────────────────────────────
   VideoPlayer — fully custom controls on top of <video>
   Supports: play/pause, rewind 10s, skip 10s, seek bar,
             volume, mute, playback speed, fullscreen.
   Props:
     src  — video URL string (empty = show placeholder)
     accentColor — hex string for theming
───────────────────────────────────────────────────────────── */
function VideoPlayer({ src, accentColor = '#6DCFA0' }) {
  const videoRef   = useRef(null);
  const wrapRef    = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);      // 0–100
  const [current,  setCurrent]  = useState(0);      // seconds
  const [duration, setDuration] = useState(0);
  const [volume,   setVolume]   = useState(1);
  const [muted,    setMuted]    = useState(false);
  const [speed,    setSpeed]    = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // sync state → video element
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.muted  = muted;
  }, [volume, muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = speed;
  }, [speed]);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrent(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100 || 0);
  };

  const onLoadedMetadata = () => {
    setDuration(videoRef.current?.duration || 0);
  };

  const onEnded = () => setPlaying(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }, []);

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const rewind = () => {
    const v = videoRef.current;
    if (v) v.currentTime = Math.max(0, v.currentTime - 10);
  };

  const skipForward = () => {
    const v = videoRef.current;
    if (v) v.currentTime = Math.min(v.duration || 0, v.currentTime + 10);
  };

  const toggleMute = () => setMuted(m => !m);

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="video-card" ref={wrapRef}>
      {/* ── Video stage ─────────────────────────────────── */}
      <div className="video-stage" onClick={togglePlay}>
        {src ? (
          <video
            ref={videoRef}
            src={src}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={onEnded}
          />
        ) : (
          <div className="video-placeholder">
            <span className="video-placeholder-icon">🎬</span>
            <p>Video coming soon</p>
          </div>
        )}
      </div>

      {/* ── Seek bar ────────────────────────────────────── */}
      <div
        className="video-progress-wrap"
        onClick={seek}
        role="slider"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Video progress"
      >
        <div
          className="video-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Controls ────────────────────────────────────── */}
      <div className="video-controls">
        {/* Rewind 10s */}
        <button className="vc-btn" onClick={rewind} title="Rewind 10s" aria-label="Rewind 10 seconds">
          ⟪
        </button>

        {/* Play / Pause */}
        <button className="vc-btn play-pause" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '⏸' : '▶'}
        </button>

        {/* Skip 10s */}
        <button className="vc-btn" onClick={skipForward} title="Skip 10s" aria-label="Skip 10 seconds">
          ⟫
        </button>

        {/* Time */}
        <span className="vc-time">{fmt(current)} / {fmt(duration)}</span>

        <div className="vc-spacer" />

        {/* Volume */}
        <div className="vc-volume-wrap">
          <button className="vc-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </button>
          <input
            className="vc-slider"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }}
            aria-label="Volume"
          />
        </div>

        {/* Speed */}
        <select
          className="vc-speed-select"
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          aria-label="Playback speed"
        >
          {SPEEDS.map(s => (
            <option key={s} value={s}>{s}×</option>
          ))}
        </select>

        {/* Fullscreen */}
        <button className="vc-btn" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
          {fullscreen ? '⛶' : '⛶'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   QuizSection — steps through questions one at a time,
   shows explanation after each answer, ends on results screen.
   Props:
     questions   — array from lesson data
     accentColor — hex
───────────────────────────────────────────────────────────── */
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function QuizSection({ questions, accentColor = '#6DCFA0' }) {
  const [index,    setIndex]    = useState(0);
  const [selected, setSelected] = useState(null);   // chosen option index
  const [answers,  setAnswers]  = useState([]);      // history for results
  const [done,     setDone]     = useState(false);

  const q = questions[index];
  const answered = selected !== null;
  const pct = ((index) / questions.length) * 100;

  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswers(prev => [...prev, { questionId: q.id, chosen: i, correct: i === q.correctIndex }]);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
    } else {
      setIndex(i => i + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setDone(false);
  };

  const score = answers.filter(a => a.correct).length;

  if (done) {
    const pctScore = Math.round((score / questions.length) * 100);
    const msg = pctScore === 100 ? 'Perfect score! 🎉'
              : pctScore >= 70  ? 'Great work! Keep it up.'
              : 'Keep practising — you\'ve got this!';
    return (
      <div className="quiz-card">
        <div className="quiz-card-header">
          <div className="quiz-icon">🏁</div>
          <div>
            <h2>Quiz Complete</h2>
            <p>{questions.length} questions</p>
          </div>
        </div>
        <div className="quiz-results">
          <div className="quiz-results-score">
            {score}<span> / {questions.length}</span>
          </div>
          <p>{msg}</p>
          <div className="quiz-results-actions">
            <button className="quiz-nav-btn primary" onClick={restart}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-card">
      {/* Header */}
      <div className="quiz-card-header">
        <div className="quiz-icon">📝</div>
        <div>
          <h2>Lesson Quiz</h2>
          <p>Test what you've just watched</p>
        </div>
      </div>

      {/* Progress */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Question */}
      <div className="quiz-question-label">
        Question {index + 1} of {questions.length}
      </div>
      <div className="quiz-question-text">{q.question}</div>

      {/* Options */}
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (answered) {
            if (i === q.correctIndex) cls += ' correct';
            else if (i === selected)  cls += ' wrong';
            else                      cls += ' revealed';
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => choose(i)}
              disabled={answered}
            >
              <span className="quiz-option-letter">{LETTERS[i]}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && q.explanation && (
        <div className="quiz-explanation">
          💡 {q.explanation}
        </div>
      )}

      {/* Nav */}
      <div className="quiz-nav">
        <span style={{ fontSize: '0.82rem', color: '#8AACBA' }}>
          Score so far: {answers.filter(a => a.correct).length}/{answers.length}
        </span>
        <button
          className="quiz-nav-btn primary"
          onClick={next}
          disabled={!answered}
        >
          {index + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LessonPage — assembles breadcrumb + header + video + quiz
───────────────────────────────────────────────────────────── */
function LessonPage() {
  const { lessonId } = useParams();
  const navigate     = useNavigate();
  const result       = findLesson(lessonId);

  if (!result) {
    return (
      <div className="lesson-page">
        <div className="lesson-body">
          <p style={{ color: '#C0392B', marginTop: 40 }}>
            Lesson not found.{' '}
            <button
              style={{ color: '#2A7EA8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/courses')}
            >
              Back to courses
            </button>
          </p>
        </div>
      </div>
    );
  }

  const { lesson, level } = result;

  return (
    <div className="lesson-page">
      {/* ── Breadcrumb ────────────────────────────────── */}
      <nav className="lesson-breadcrumb" aria-label="breadcrumb">
        <button onClick={() => navigate('/courses')}>All Courses</button>
        <span>›</span>
        <span>{level.label}</span>
        <span>›</span>
        <span style={{ color: '#1A2E3B', fontWeight: 600 }}>{lesson.title}</span>
      </nav>

      <div className="lesson-body">
        {/* ── Header ──────────────────────────────────── */}
        <div className="lesson-header">
          <span
            className="lesson-level-badge"
            style={{ background: level.colorLight, color: level.color }}
          >
            {level.emoji} {level.label}
          </span>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
        </div>

        {/* ── Video ───────────────────────────────────── */}
        <VideoPlayer src={lesson.videoUrl} accentColor={level.color} />

        {/* ── Quiz ────────────────────────────────────── */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <QuizSection questions={lesson.quiz} accentColor={level.color} />
        )}

        {/* ── Back button ─────────────────────────────── */}
        <div style={{ paddingBottom: 8 }}>
          <button
            className="quiz-nav-btn secondary"
            onClick={() => navigate('/courses')}
          >
            ← Back to All Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;
