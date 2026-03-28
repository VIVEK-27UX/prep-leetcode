import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({ title: '', url: '', difficulty: 'Easy' });

  // 1. Fetch all questions from the database
  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/questions');
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 2. Handle adding a new solved problem
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions', formData);
      setFormData({ title: '', url: '', difficulty: 'Easy' });
      fetchQuestions(); // Refresh the list
      alert("Question saved to your revision queue! 🚀");
    } catch (err) {
      alert("Error saving question. Is your backend running?");
    }
  };

  // 3. Handle revision "Level Up"
  const handleRevision = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/questions/${id}`);
      alert(res.data.message);
      fetchQuestions();
    } catch (err) {
      console.error("Revision update failed", err);
    }
  };

  // Inside your App component, change the return to this:
return (
  <div style={{ maxWidth: '800px', margin: 'auto', padding: '40px' }}>
    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h1>My Daily DSA Prep 🎯</h1>
      <p>{new Date().toDateString()}</p>
    </header>

    {/* SECTION 1: DAILY NEW CHALLENGES */}
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ borderLeft: '5px solid #007bff', paddingLeft: '15px' }}>🚀 Today's 2 New Problems</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {dailyPlan.newChallenges?.map(q => (
          <div key={q._id} style={cardStyle}>
            <div>
              <strong>{q.title}</strong> <br/>
              <a href={q.url} target="_blank" rel="noreferrer" style={{fontSize: '13px'}}>Open on LeetCode ↗</a>
            </div>
            <button onClick={() => handleFirstSolve(q._id)} style={solveButtonStyle}>Mark as Done</button>
          </div>
        ))}
      </div>
    </section>

    {/* SECTION 2: REVISION QUEUE */}
    <section>
      <h2 style={{ borderLeft: '5px solid #28a745', paddingLeft: '15px' }}>⏳ Due for Revision</h2>
      {dailyPlan.revisionTasks?.length > 0 ? (
        <div style={{ display: 'grid', gap: '15px' }}>
          {dailyPlan.revisionTasks.map(q => (
            <div key={q._id} style={cardStyle}>
              <div>
                <strong>{q.title}</strong> (Level {q.level})<br/>
                <a href={q.url} target="_blank" rel="noreferrer" style={{fontSize: '13px'}}>Review Logic ↗</a>
              </div>
              <button onClick={() => handleRevision(q._id)} style={revisionButtonStyle}>Revised ✅</button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'gray' }}>Great job! No revisions due for today.</p>
      )}
    </section>
  </div>
);

// Basic Styles
const cardStyle = { 
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
  padding: '15px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};
const solveButtonStyle = { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' };
const revisionButtonStyle = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' };
}

export default App;