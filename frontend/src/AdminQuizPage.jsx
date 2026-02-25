import { useState } from 'react';
import useAuth from './hooks/useAuth.js';
import './AdminQuizPage.css';

function AdminQuizPage() {
  const { token } = useAuth();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(null);
  const [message, setMessage] = useState('');

  function submit(e) {
    e.preventDefault();
    // strip empty strings and adjust correct index accordingly
    const filtered = options.map(o=>o.trim()).filter(o=>o !== '');
    let finalCorrect = -1;
    if (correct != null && filtered.length > 0) {
      finalCorrect = filtered.findIndex(o => o === options[correct]);
      if (finalCorrect === -1) finalCorrect = 0;
    }
    const payload = {
      question,
      options: filtered,
      correctIndex: finalCorrect >= 0 ? finalCorrect : 0
    };

    fetch('/api/quiz/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    }).then(r => {
      if (r.ok) return r.json();
      if (r.status === 401 || r.status === 403) {
        throw new Error('Unauthorized');
      }
      throw new Error('Failed');
    }).then(() => {
      setMessage('Question added');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrect(null);
    }).catch(err => {
      if (err.message === 'Unauthorized') {
        setMessage('You are not authorized to add questions.');
      } else {
        setMessage('Error adding question');
      }
    });
  }

  return (
    <div className="page">
      <h2>Admin: Add Quiz Question</h2>
      <form onSubmit={submit} className="admin-form">
          <div>
          <label>Question</label>
          <input value={question} onChange={e=>setQuestion(e.target.value)} required />
        </div>
        {options.map((opt, i) => (
          <div className="option-row" key={i}>
            <label className="radio-label">
              <input
                type="radio"
                name="correct"
                checked={correct === i}
                onChange={() => setCorrect(i)}
                disabled={opt.trim() === ''}
              />
              Correct
            </label>
            <input
              className="option-input"
              value={opt}
              onChange={e => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                setOptions(newOpts);
                if (correct === i && e.target.value.trim() === '') {
                  setCorrect(null);
                }
              }}
              required={i < 2}
              placeholder={`Option ${i + 1}`}
            />
          </div>
        ))}
        <div style={{marginTop:12}}>
          <button type="submit">Add Question</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminQuizPage;
