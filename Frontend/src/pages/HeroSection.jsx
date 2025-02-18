import new1 from "../assets/city.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative h-[500px] w-full md:h-[500px] lg:h-[650px]">
      <img
        src={new1} // Replace with your image URL
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white space-y-4"
      >
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl ">
          New City, No Stress.
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl ">
          We&apos;ve Got You Covered.
        </p>

        <Link
          to="/contact"
          className="mt-4 rounded bg-white text-black px-6 py-3 text-base  hover:bg-orange-300 sm:text-lg md:text-xl"
        >
          Request a Callback
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroSection;
