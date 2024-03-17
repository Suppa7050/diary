import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Dropdown } from 'react-bootstrap';

function IdeaList() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3031/ideas/list');
        setIdeas(response.data.acts);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3031/ideas/${id}`);
      setIdeas(ideas.filter((idea) => idea._id !== id));
      alert('Idea deleted successfully');
    } catch (error) {
      console.error('Error deleting idea:', error);
      alert('Error deleting idea');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3031/ideas/update/${id}`, {
        Statuscr: newStatus,
      });
      const updatedIdeas = ideas.map((idea) => {
        if (idea._id === id) {
          return { ...idea, Statuscr: newStatus };
        }
        return idea;
      });
      setIdeas(updatedIdeas);
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const getStatus = (date, statuscr) => {
    const currentDate = new Date();
    const ideaDate = new Date(date);
    let statusText = '';
  
    if (statuscr === 'completed') {
      statusText = 'Completed';
    } else if (statuscr === 'cancelled') {
      statusText = 'Cancelled';
    } else if (currentDate < ideaDate) {
      statusText = 'In Progress';
    } else {
      statusText = 'Pending';
    }
  
    let statusStyle = {}; // Default empty style
  
    if (statuscr === 'completed') {
      statusStyle = { color: 'green' }; // Green color for completed status
    } else if (statuscr === 'cancelled') {
      statusStyle = { color: 'red' }; // Red color for cancelled status
    } else if (currentDate < ideaDate) {
      statusStyle = { color: 'blue' }; // Blue color for in-progress status
    } else {
      statusStyle = { color: 'yellow' }; // Yellow color for pending status
    }
  
    return <span style={statusStyle}>{statusText}</span>;
  };
  

  return (
    <div>
      <h2>Idea List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => (
            <tr key={idea._id}>
              <td>{idea.Title}</td>
              <td>{idea.Date}</td>
              <td>{getStatus(idea.Date, idea.Statuscr)}</td>
              <td>
                {idea.Statuscr !== 'completed' && idea.Statuscr !== 'cancelled' && (
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Change Status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(idea._id, 'completed')}
                      >
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(idea._id, 'cancelled')}
                      >
                        Cancelled
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default IdeaList;
