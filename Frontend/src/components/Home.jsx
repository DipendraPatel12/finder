import React, { useEffect, useState } from "react";
import homeImage from '../assets/ForRent.png';

const Home = () => {
  const [animate, setAnimate] = useState(false); // For text animation

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="h-[300px] relative overflow-hidden bg-gray-100">
      {/* Background image with blur effect */}
      <div
        className="absolute inset-0 bg-cover h-100 "
        style={{
          backgroundImage: `url(${homeImage})`,
          filter: "blur(8px)",
        }}
      ></div>

      {/* Container for text */}
      <div className="container mx-auto h-full flex items-center justify-center relative z-10 px-8">
        {/* Texts container */}
        <div className="text-center space-y-4">
          {/* First text comes from left */}
          <div
            className={`transform ${
              animate ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-1000 ease-out`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Thank You For Visting
            </h1>
          </div>

          {/* Second text comes from right, placed below the first text */}
          <div
            className={`transform ${
              animate ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-1000 ease-out`}
          >
            <p className="text-lg md:text-xl text-white">
               Your Ideal Room is Just a Click Away
            </p>
          </div>
          <div>
            <button className="bg-white text-black p-2 rounded-md">Explore Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
