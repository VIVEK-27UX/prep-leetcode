import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function App() {
  const [plan, setPlan] = useState({ revisionTasks: [], newChallenges: [] });
  const [selectedTopic, setSelectedTopic] = useState('All');

  const fetchDailyPlan = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/daily-plan?topic=${selectedTopic}`);
      setPlan(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }, [selectedTopic]);

  useEffect(() => {
    fetchDailyPlan();
  }, [fetchDailyPlan]);

  const handleDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/questions/${id}`);
      fetchDailyPlan();
      alert("Progress Saved! 📈");
    } catch (err) {
      alert("Error updating progress");
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Prep Leetcode 🎯</h1>

      {/* TOPIC SELECTOR */}
      <div style={{ textAlign: 'center', marginBottom: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <label style={{ fontWeight: 'bold' }}>Study Focus: </label>
        <select 
          value={selectedTopic} 
          onChange={(e) => setSelectedTopic(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}
        >
          <option value="All">Mix Everything</option>
          <option value="Arrays">Arrays</option>
          <option value="Strings">Strings</option>
          <option value="Linked Lists">Linked Lists</option>
          <option value="Trees">Trees</option>
          <option value="DP">Dynamic Programming</option>
        </select>
      </div>

      {/* NEW CHALLENGES */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#007bff', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>🚀 New for Today</h3>
        {plan.newChallenges.length > 0 ? plan.newChallenges.map(q => (
          <div key={q._id} style={cardStyle}>
            <div>
              <strong>{q.title}</strong> <span style={tagStyle(q.difficulty)}>{q.difficulty}</span><br/>
              <a href={q.url} target="_blank" rel="noreferrer" style={{ fontSize: '13px' }}>Solve on LeetCode ↗</a>
            </div>
            <button onClick={() => handleDone(q._id)} style={btnStyle('#007bff')}>Mark Done</button>
          </div>
        )) : <p style={{ color: 'gray' }}>No new {selectedTopic} problems left! Try another topic.</p>}
      </section>

      {/* REVISIONS */}
      <section>
        <h3 style={{ color: '#28a745', borderBottom: '2px solid #28a745', paddingBottom: '5px' }}>⏳ Revisions Due</h3>
        {plan.revisionTasks.length > 0 ? plan.revisionTasks.map(q => (
          <div key={q._id} style={cardStyle}>
            <div>
              <strong>{q.title}</strong> <span style={{ fontSize: '12px', color: 'gray' }}>(Lvl {q.level})</span><br/>
              <a href={q.url} target="_blank" rel="noreferrer" style={{ fontSize: '13px' }}>Review Logic ↗</a>
            </div>
            <button onClick={() => handleDone(q._id)} style={btnStyle('#28a745')}>Revised ✅</button>
          </div>
        )) : <p style={{ color: 'gray' }}>Revision queue is empty. Great job!</p>}
      </section>
    </div>
  );
}

// Styles
const cardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eee', borderRadius: '10px', marginBottom: '12px', background: 'white' };
const btnStyle = (color) => ({ backgroundColor: color, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' });
const tagStyle = (diff) => ({ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px', color: 'white', background: diff === 'Easy' ? '#28a745' : diff === 'Medium' ? '#ffc107' : '#dc3545' });

export default App;