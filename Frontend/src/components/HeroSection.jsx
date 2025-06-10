import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showLaunch, setShowLaunch] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const holdInterval = useRef(null);

  const handleTimeMachineClick = () => {
    setShowLaunch(true);
  };

  const handleHoldStart = () => {
    setIsHolding(true);
    let value = 0;
    holdInterval.current = setInterval(() => {
      value += 1;
      setHoldProgress(value);
      if (value >= 100) {
        clearInterval(holdInterval.current);
        triggerLaunch();
      }
    }, 30);
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    clearInterval(holdInterval.current);
    setHoldProgress(0);
  };

  const triggerLaunch = () => {
    setLoading(true);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setLoadProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        navigate('/user-info');
      }
    }, 100);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-black">

      {/* Fire Navigation Bar */}
      <nav className="fire-navbar">
        <div className="fire-navbar-content">
          <div className="scrolling-text">...............................................................</div>
        </div>
      </nav>

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="background_timetravel.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="video-overlay"></div>

      {/* White Fill During Hold */}
      {isHolding && (
        <div
          className="white-fill-overlay"
          style={{ width: `${holdProgress}%` }}
        ></div>
      )}

      {/* Title */}
      <div className="z-10 mt-16 text-center">
        <h2 className="hero-title">TIME TRAVELER</h2>
      </div>

      {/* Main Section */}
      <div className="relative flex-grow flex items-center justify-center z-10">
        {!showLaunch && !loading && (
          <button className="time-machine-btn" onClick={handleTimeMachineClick}>
            C O N T I N U E
          </button>
        )}

        {showLaunch && !loading && (
          <div className="launch-wrapper">
            <button
              className="launch-btn"
              onMouseDown={handleHoldStart}
              onMouseUp={handleHoldEnd}
              onMouseLeave={handleHoldEnd}
            >
              <div className="progress-fill" style={{ width: `${holdProgress}%` }}></div>
              <span>Launch</span>
            </button>
            <p className="helper-text">Hold it!!</p>
          </div>
        )}

        {loading && (
          <div className="loading-screen">
            <div className="loading-container">
              <p className={`loading-text ${loadProgress >= 70 && loadProgress < 75 ? 'glitchy' : ''}`}>
                Loading... {loadProgress}%
              </p>
              <div className="loading-bar-wrapper">
                <div
                  className={`loading-bar-fill ${loadProgress >= 70 && loadProgress < 75 ? 'bar-glitch' : ''}`}
                  style={{ width: `${loadProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Gradient */}
      <div className="footer-gradient"></div>

      {/* Footer Text */}
      <footer className="z-10 w-full bg-black bg-opacity-70 text-white py-4 text-center text-sm font-Arial">
        <p>Explore the limits of time and imagination with AI-powered journeys | Xerces</p>
      </footer>
    </div>
  );
};

export default HeroSection;
