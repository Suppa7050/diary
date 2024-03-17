import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function AddIdea() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3031/ideas/add', {
        Title: title,
        Date: date,
        Statuscr: status,
      });
      alert('Activity added successfully');
      setTitle('');
      setDate('');
      setStatus('');
    } catch (error) {
      alert('Error adding idea');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <input
            type="text"
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div> */}
        <button type="submit" className="btn btn-primary">Add Idea</button>
      </form>
    </div>
  );
}

export default AddIdea;
