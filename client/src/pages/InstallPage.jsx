import { useEffect, useState } from "react";

export default function InstallPage() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = () => {
    if (prompt) prompt.prompt();
  };

  return (
<div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 bg-white text-gray-800 p-6">
  
  {/* Text */}
  <div className="flex flex-col items-center text-center md:text-left max-w-xs">
    <img
      src="/favicon.png"
      className="w-20 mb-4 rounded-xl"
      alt="MovieGeek"
    />

    <h1 className="text-3xl font-bold text-gray-900 mb-1">
      Install MovieGeek
    </h1>

    <p className="text-gray-500 mb-6">
      Experience MovieGeek like a real app
    </p>

    <button
      onClick={install}
      disabled={!prompt}
      className={`px-6 py-3 rounded-xl text-white font-semibold shadow-md transition-all
        ${
          prompt
            ? "bg-sky-500 hover:bg-sky-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
    >
      Install App
    </button>
  </div>

  {/* Screenshot */}
  <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100">
    <div className="w-56 overflow-hidden rounded-2xl">
      <img
        src="/screenshots/home.png"
        className="w-full h-full object-cover"
        alt="App Preview"
      />
    </div>
  </div>
</div>

  );
}
