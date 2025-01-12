import  { useState, useEffect } from 'react';
import newpg1 from '../assets/city.webp'
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setTimeout(() => setAnimate(true), 100); // Add slight delay for smooth animation
  }, []);

  return (
    <div className="relative h-[500px] w-full md:h-[500px] lg:h-[650px]">
      {/* Background Image */}
      <img
        src={newpg1} // Replace with your image URL
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white space-y-4">
        {/* "New City, No Stress" - From Left */}
        <h1
          className={`text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl transform transition-transform duration-1000 ${
            animate ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}
        >
          New City, No Stress.
        </h1>

        {/* "We've Got You Covered" - From Right */}
        <p
          className={`text-lg sm:text-xl md:text-2xl transform transition-transform duration-1000 delay-200 ${
            animate ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
        >
          We&apos;ve Got You Covered.
        </p>

        {/* Button */}
        <Link to='/contact' className="mt-4 rounded bg-white text-black px-6 py-3 text-base  hover:bg-orange-300 sm:text-lg md:text-xl">
          Request a Callback
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
