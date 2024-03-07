"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import llamaImage from "../public/llama.png";

export default function Home() {
  const [count, setCount] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [autoClickerInterval, setAutoClickerInterval] = useState(null);
  const [multiplierCost, setMultiplierCost] = useState(10);
  const [autoClickerCost, setAutoClickerCost] = useState(50);

  useEffect(() => {
    if (autoClickerInterval) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + clickMultiplier);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [autoClickerInterval, clickMultiplier]);

  const handleClick = () => {
    setCount(count + clickMultiplier);
  };

  const handleUpgradeMultiplier = () => {
    if (count >= multiplierCost) {
      setCount(count - multiplierCost);
      setClickMultiplier(clickMultiplier + 2);
      setMultiplierCost(multiplierCost * 2);
    }
  };

  const handleUpgradeAutoClicker = () => {
    if (count >= autoClickerCost && !autoClickerInterval) {
      setCount(count - autoClickerCost);
      setAutoClickerInterval(null);
      setAutoClickerCost(autoClickerCost * 2);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7b52a] text-purple-500">
      <h1 className="text-3xl mb-5 text-purple-500">Fortnite Clicker</h1>
      <Image
        src={llamaImage}
        alt="Llama"
        onClick={handleClick}
        width={200}
        height={200}
        className="rounded-full cursor-pointer mb-5"
      />
      <p className="text-2xl mb-5">Victory Royales: {count}</p>
      <button
        className={`px-4 py-2 bg-[#1c2c38] text-white rounded-md mr-4 mb-2 ${
          count < multiplierCost ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleUpgradeMultiplier}
        disabled={count < multiplierCost}
      >
        Upgrade Multiplier (Cost: {multiplierCost} Victory Royales)
      </button>
      <button
        className={`px-4 py-2 bg-[#1c2c38] text-white rounded-md ${
          count < autoClickerCost || autoClickerInterval !== null
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={handleUpgradeAutoClicker}
        disabled={count < autoClickerCost || autoClickerInterval !== null}
      >
        Upgrade Auto Clicker (Cost: {autoClickerCost} Victory Royales)
      </button>
    </div>
  );
}