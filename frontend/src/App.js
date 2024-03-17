import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddIdea from './components/AddIdea';
import IdeaList from './components/IdeaList';
import Charts from './components/Charts'; // Import Charts component

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<AddIdea />} />
          <Route path="/list" element={<IdeaList />} />
          <Route path="/charts" element={<Charts />} /> // Route for Charts component
        </Routes>
      </div>
    </Router>
  );
}

export default App;
