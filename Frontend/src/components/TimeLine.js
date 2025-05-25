import React from 'react';
import { useParams } from 'react-router-dom';

const TimelinePage = () => {
  const { eraName } = useParams();

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-purple-800 to-black text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the {decodeURIComponent(eraName)} Era</h1>
      <p className="text-lg max-w-2xl mx-auto">
        This page is dedicated to the timeline: <strong>{decodeURIComponent(eraName)}</strong>. You can add descriptions, images, events, or even AI-generated narratives for this era.
      </p>
    </div>
  );
};

export default TimelinePage;
