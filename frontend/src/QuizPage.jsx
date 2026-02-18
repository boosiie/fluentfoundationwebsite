import { useEffect, useState } from 'react';
import './HomePage.css';

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

  if (questions.length === 0) return <div className="page">No quiz questions available.</div>;

  const q = questions[index];

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctIndex) setScore(s => s + 1);
  }

  function next() {
    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      setFinished(true);
    } else {
      setIndex(nextIndex);
      setSelected(null);
    }
  }

  if (finished) {
    return (
      <div className="page">
        <h2>Quiz complete</h2>
        <p>Your score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Quiz</h2>
      <div className="quiz-card">
        <p>{q.question}</p>
        <div className="options">
          {q.options.map((opt, i) => (
            <button key={i} className={`option ${selected===i? 'selected':''}`} onClick={() => choose(i)}>
              {opt}
            </button>
          ))}
        </div>
        <div style={{marginTop:12}}>
          <button onClick={next} disabled={selected===null}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
