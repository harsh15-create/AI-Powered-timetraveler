import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import UserForm from './components/UserForm';
import JourneyPage from './components/JourneyPage';
import TimeLine from './components/TimeLine'; // new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/user-info" element={<UserForm />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/timeline/:eraName" element={<TimeLine />} /> {/* dynamic */}
      </Routes>
    </Router>
  );
}

export default App;

