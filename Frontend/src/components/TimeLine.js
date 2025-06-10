import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TimelinePage = () => {
  const { eraName } = useParams();
  const decodedEraName = decodeURIComponent(eraName);
  const userId = localStorage.getItem("userId");

  const [timelineDescription, setTimelineDescription] = useState('');
  const [aiGeneratedStory, setAiGeneratedStory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch story from backend
        const storyRes = await fetch(`http://localhost:8080/api/users/${userId}/story`);
        if (!storyRes.ok) throw new Error("Failed to fetch story");
        const storyData = await storyRes.json();
        setAiGeneratedStory(storyData.story || 'No story available.');

        // Fetch era description
        const res = await fetch('/eraDescriptions.json');
        if (!res.ok) throw new Error("Failed to load era descriptions");
        const Data = await res.json();
        const description = Data[decodedEraName];
        setTimelineDescription(description || 'No description available for this era.');
      } catch (error) {
        console.error("Error fetching timeline data:", error);
        setAiGeneratedStory("Failed to load story.");
        setTimelineDescription("Failed to load description.");
      } finally {
        // ✅ Ensure loading is stopped after everything
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedEraName, userId]);

  // Background image mapping
  const backgroundImages = {
    "Ancient Egypt": "/backgrounds/egypt.jpg",
    "Classical Greece": "/backgrounds/greece.jpg",
    "Medieval Europe": "/backgrounds/medieval.jpg",
    "Victorian Era": "/backgrounds/victorian.jpg",
    "World War 2": "/backgrounds/ww2.jpg",
    "Near Future (2070)": "/backgrounds/future.jpg",
    "AI Singularity Age": "/backgrounds/ai.jpg",
    "Interstellar Colonization": "/backgrounds/space.jpg",
    "Post Human Era": "/backgrounds/posthuman.jpg",
    "Time Loop Paradox Era": "/backgrounds/timeloop.jpg"
  };

  const backgroundImage = backgroundImages[decodedEraName] || "/default-bg.jpg";

  return (
    <div className="relative min-h-screen text-white text-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          opacity: 0.5,
          zIndex: 0
        }}
      />

      {/* Content Area */}
      <div className="relative z-10 p-10 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 inline-block px-6 py-3 rounded-xl">
          Welcome to the {decodedEraName} Era
        </h1>

        {loading ? (
          <p className="text-lg mt-8">Loading timeline...</p>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 h-[75vh]">
            {/* Timeline Description */}
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg text-left overflow-y-auto max-h-full">
              <h2 className="text-2xl font-semibold mb-2">About this Timeline</h2>
              <p className="text-base whitespace-pre-line">{timelineDescription}</p>
            </div>

            {/* AI Generated Story */}
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg text-left overflow-y-auto max-h-full">
              <h2 className="text-2xl font-semibold mb-2">Your Personalized Story</h2>
              <p className="text-base whitespace-pre-line">{aiGeneratedStory}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelinePage;