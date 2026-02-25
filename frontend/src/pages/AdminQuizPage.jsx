import { useState } from 'react';

function AdminQuizPage() {
  const [question, setQuestion] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correct, setCorrect] = useState(0);
  const [message, setMessage] = useState('');

  function submit(e) {
    e.preventDefault();
    const payload = {
      question,
      options: [opt0, opt1, opt2, opt3].filter(Boolean),
      correctIndex: Number(correct)
    };

    fetch('/api/quiz/questions', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    }).then(r => {
      if (r.ok) return r.json();
      throw new Error('Failed');
    }).then(() => {
      setMessage('Question added');
      setQuestion(''); setOpt0(''); setOpt1(''); setOpt2(''); setOpt3(''); setCorrect(0);
    }).catch(() => setMessage('Error adding question'));
  }

  return (
    <div className="page">
      <h2>Admin: Add Quiz Question</h2>
      <form onSubmit={submit} className="admin-form">
        <div>
          <label>Question</label>
          <input value={question} onChange={e=>setQuestion(e.target.value)} required />
        </div>
        <div>
          <label>Option 1</label>
          <input value={opt0} onChange={e=>setOpt0(e.target.value)} required />
        </div>
        <div>
          <label>Option 2</label>
          <input value={opt1} onChange={e=>setOpt1(e.target.value)} required />
        </div>
        <div>
          <label>Option 3</label>
          <input value={opt2} onChange={e=>setOpt2(e.target.value)} />
        </div>
        <div>
          <label>Option 4</label>
          <input value={opt3} onChange={e=>setOpt3(e.target.value)} />
        </div>
        <div>
          <label>Correct option index (0-based)</label>
          <input type="number" value={correct} onChange={e=>setCorrect(e.target.value)} min={0} />
        </div>
        <div style={{marginTop:12}}>
          <button type="submit">Add Question</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminQuizPage;
