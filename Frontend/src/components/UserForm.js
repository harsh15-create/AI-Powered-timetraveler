import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const personalityOptions = [
  'Introvert', 'Extrovert', 'Adventurous', 'Creative', 'Intelligent',
  'Ambitious', 'Merciful', 'Short-tempered', 'Psychopathic', 'Possessive'
];

const UserForm = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [personality, setPersonality] = useState([]);
  const [interests, setInterests] = useState('');
  const [uploading, setUploading] = useState(false);
  const [codeLines, setCodeLines] = useState([]);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [postLoadingLines, setPostLoadingLines] = useState([]);
  const navigate = useNavigate();

  const toggleTrait = (trait) => {
    setPersonality((prev) =>
      prev.includes(trait)
        ? prev.filter((t) => t !== trait)
        : [...prev, trait]
    );
  };

  const handleUpload = async () => {
    if (!name || !dob || !currentStatus || personality.length === 0) {
      setError('Please introduce yourself properly.');
      setDisplayedLines(['// Please introduce yourself properly.']);
      return;
    }

    setError('');
    setUploading(true);
    setDisplayedLines([]);

    const payload = {
      name,
      dob,
      currentSituation: currentStatus,
      interests,
      personalities: personality
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User Saved', data);

      if (data.id) {
        localStorage.setItem("userId", data.id);
      } else {
        throw new Error('Invalid response format: Missing ID');
      }

      setCodeLines([
        "Analyzing user input...",
        "Connecting to neural interface...",
        "Extracting psychological profile...",
        "Matching personality patterns...",
        "Compiling results...",
        "Finalizing connection..."
      ]);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to save user data.");
      setUploading(false);
    }
  };

  useEffect(() => {
    if (codeLines.length > 0 && uploading) {
      let i = 0;
      const interval = setInterval(() => {
        const line = codeLines[i];
        const lineObj = { text: line, id: Date.now() + i };
        setDisplayedLines((prev) => [...prev, lineObj]);
        i++;
        if (i === codeLines.length) {
          clearInterval(interval);
          let prog = 0;
          const progInterval = setInterval(() => {
            prog += 2;
            setProgress(prog);
            if (prog >= 100) {
              clearInterval(progInterval);
              const finalLines = [
                "Loading timelines...",
                "Accessing multiverse threads...",
                "Calibrating memory data...",
                "Getting you to the time portal..."
              ];
              let j = 0;
              const finalInterval = setInterval(() => {
                setPostLoadingLines((prev) => [...prev, finalLines[j]]);
                j++;
                if (j === finalLines.length) {
                  clearInterval(finalInterval);
                  setTimeout(() => navigate('/journey'), 200);
                }
              }, 500);
            }
          }, 20);
        }
      }, 600);
    }
  }, [codeLines]);

  const formCode = `
const userData = {
  name: "${name}",
  dob: "${dob}",
  currentStatus: "${currentStatus}",
  personality: [${personality.map(p => `"${p}"`).join(", ")}],
  interests: "${interests}"
};`.trim();

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">

      {/*Vedio Background*/}

      <video
       autoPlay
       loop
       muted
       playsInline
       className='absolute top-0 left-0 w-full h-full object-cover z-0'
       >
        <source src="/Userform_Background.mp4" type="video/mp4" />
            your browser does not support the video tag.
       </video>

       {/*Overlay Content*/}

     <div className="relative z-10 flex flex-row items-start justify-center p-6 space-x-6 bg-black bg-opacity-70 min-h-screen">

      {/* Form (Left Side) */}
      <form className="w-[45%] bg-white bg-opacity-10 p-6 rounded-2xl shadow-xl backdrop-blur text-sm flex flex-col justify-between" style={{ minHeight: '90vh' }}>
        <div>
          <h2 className="text-2xl font-bold mb-4">Hi Capitan... Introduce Yourself!!</h2>

          {error && <div className="mb-4 text-red-400 font-semibold">{error}</div>}

          <label className="block mb-3">
            <span>Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-white text-black" required />
          </label>

          <label className="block mb-3">
            <span>Date of Birth</span>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-white text-black" required />
          </label>

          <label className="block mb-3">
            <span>Your Current Situation</span>
            <input type="text" value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              placeholder="e.g, Student, Developer..." className="w-full mt-1 p-2 rounded bg-white text-black" required />
          </label>

          <div className="mb-3">
            <span>Personality Traits (Select all that apply)</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {personalityOptions.map((trait) => (
                <label
                  key={trait}
                  className="flex items-center space-x-2 text-sm transform transition-transform duration-150 hover:scale-105"
                >
                  <input
                    type="checkbox"
                    value={trait}
                    checked={personality.includes(trait)}
                    onChange={() => toggleTrait(trait)}
                    className="form-checkbox text-blue-500 w-4 h-4"
                  />
                  <span>{trait}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="block mb-3">
            <span>Your Interests <span className="text-gray-300">(Optional)</span></span>
            <input type="text" value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-white text-black" />
          </label>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={handleUpload}
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 flex items-center space-x-2 transform transition-transform duration-150 hover:scale-105"
          >
            {uploading && (
              <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            <span>{uploading ? "Uploading..." : "Upload It"}</span>
          </button>
        </div>
      </form>

      {/* Code Window (Right Side) */}
      <div className="w-[40%] bg-black text-green-400 font-mono text-sm p-4 rounded-lg shadow-xl overflow-auto max-h-[90vh]">
        <pre>
          <code className="whitespace-pre-line">
            {formCode}

            {displayedLines.length > 0 && (
              <>
                {"\n\n// Processing...\n"}
                {displayedLines.map((line, index) => (
                  <div key={line.id} className="animate-blink">{line.text}</div>
                ))}
              </>
            )}

            {progress > 0 && progress <= 100 && (
              <div className="mt-4">
                <div className="w-full bg-gray-700 h-2 rounded">
                  <div
                    className="bg-green-400 h-2 rounded"
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                  />
                </div>
                <div className="text-white text-xs mt-1">{progress}%</div>
              </div>
            )}

            {postLoadingLines.length > 0 && (
              <div className="mt-4">
                {postLoadingLines.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            )}
          </code>
        </pre>
      </div>
     </div> 

      {/* Blink animation style */}
      <style>
        {`
          @keyframes blink {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
          .animate-blink {
            animation: blink 1s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default UserForm;