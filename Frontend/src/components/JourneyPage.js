import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaMountain, FaUniversity, FaCross, FaCrown, FaGlobeEurope,
  FaHourglassHalf, FaRobot, FaRocket, FaUserAstronaut, FaInfinity
} from 'react-icons/fa';

const pastEras = [
  { name: "Ancient Egypt", icon: <FaMountain />, image: "/egypt.png" },
  { name: "Classical Greece", icon: <FaUniversity />, image: "/greece.png" },
  { name: "Medieval Europe", icon: <FaCross />, image: "/europ.png" },
  { name: "Victorian Era", icon: <FaCrown />, image: "/victorian.png" },
  { name: "World War II", icon: <FaGlobeEurope />, image: "/ww2.png" },
];

const futureEras = [
  { name: "Near Future (2070)", icon: <FaHourglassHalf />, image: "/near_future.png" },
  { name: "AI Singularity Age", icon: <FaRobot />, image: "/ai.png" },
  { name: "Interstellar Colonization", icon: <FaRocket />, image: "/interstellar.png" },
  { name: "Post-Human Era", icon: <FaUserAstronaut />, image: "/post-human.png" },
  { name: "Time Loop Paradox Era", icon: <FaInfinity />, image: "/timeloop.png" },
];

const JourneyPage = () => {
  const [showFuture, setShowFuture] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const toggleView = () => setShowFuture(prev => !prev);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 355 + 24;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleTimelineSelect = (timelineName) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    fetch(`http://localhost:8080/api/users/${userId}/selectTimeline`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timelineName }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save timeline");
        return res.json();
      })
      .then((data) => {
        console.log("Backend responses:", data);
        navigate(`/timeline/${encodeURIComponent(timelineName)}`)
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving timeline.");
      });
  };

  const renderCard = (era) => (
    <div
      key={era.name}
      onClick={() => handleTimelineSelect(era.name)}
      className="w-[360px] h-[500px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
    >
      <img
        src={era.image}
        alt={era.name}
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {!showFuture && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/past_background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {showFuture && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/future_background.jpg')" }}
        />
      )}

      {/* Overlay Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-start items-center pb-32">
        {/* Heading */}
        <h1 className={`text-4xl md:text-5xl font-bold text-center pt-10 mb-10 drop-shadow-lg ${showFuture ? 'text-cyan-300' : 'text-yellow-800'} ancient-font`}>
          {showFuture ? 'Way to Future' : 'Way to Past'}
        </h1>

        {/* Horizontal Card Scrolling with Arrows */}
        <div className="relative w-full overflow-hidden pb-16">
          <div className="flex items-center justify-center space-x-4">

            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              className="text-white text-4xl p-2 hover:scale-125 transition z-10"
            >
              <FaArrowLeft />
            </button>

            {/* Scrollable Timeline Card */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 px-4 no-scrollbar"
              style={{ width: '1155px' }}
            >
              {(showFuture ? futureEras : pastEras).map(renderCard)}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              className="text-white text-4xl p-2 hover:scale-125 transition z-10"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Switch Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={toggleView}
          className="bg-black bg-opacity-60 text-white px-8 py-4 rounded-full border-2 border-white hover:bg-opacity-80 transition transform hover:scale-105 shadow-lg"
        >
          Switch the Way
        </button>
      </div>

      {/* Styles */}
      <style>{`
        .ancient-font {
          font-family: 'Cinzel Decorative', serif;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default JourneyPage;
