import { useEffect, useState } from 'react';
import './QuizPage.css';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch('/api/quiz/questions')
      .then(r => r.json())
      .then(setQuestions)
      .catch(() => setQuestions([]));
  }, []);

  // if we've completed the quiz show summary first so `q` is never accessed out of bounds
  if (finished) {
    return (
      <div className="page quiz-summary">
        <h2>Quiz complete</h2>
        <p>Your score: {score} / {questions.length}</p>
        <button className="restart" onClick={() => {
          setIndex(0);
          setScore(0);
          setSelected(null);
          setFinished(false);
        }}>Take again</button>
      </div>
    );
  }

  if (questions.length === 0) return <div className="page">No quiz questions available.</div>;

  const q = questions[index];
  const isLast = index === questions.length - 1;

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctIndex) setScore(s => s + 1);
  }

  function next() {
    if (selected === null) return; // guard just in case
    if (!isLast) {
      setIndex(i => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="page">
      <h2>Quiz ({index + 1} / {questions.length})</h2>
      <div className="quiz-card">
        <p className="question-text">{q.question}</p>
        <div className="options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option ${selected===i? 'selected':''}`}
              onClick={() => choose(i)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="controls">
          <button onClick={next} disabled={selected===null} className="next">
            {isLast ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
