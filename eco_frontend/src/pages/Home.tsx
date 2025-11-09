import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">

      {/* Logos */}
      <div className="flex items-center gap-6 justify-center mb-8">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="w-20 h-20 drop-shadow-md hover:scale-105 transition"
            alt="Vite"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="w-20 h-20 drop-shadow-md hover:scale-105 transition"
            alt="React"
          />
        </a>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-green-800 text-center mb-6">
        Welcome to EcoMarket
      </h1>

      {/* Counter Card */}
      <div className="bg-white/80 backdrop-blur border border-gray-200 w-full max-w-md mx-auto rounded-xl p-6 text-center">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 rounded-lg mb-4"
        >
          Count is {count}
        </button>

        <p className="text-gray-600">
          Edit <code className="text-green-700 font-semibold">src/pages/Home.tsx</code> and
          save to test HMR.
        </p>
      </div>

      <p className="text-center text-gray-500 mt-6">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  );
}
