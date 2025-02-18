import roomimg from "../assets/hotel-room.jpg";
import pexel from "../assets/pexels-photo.jpeg";
import pg from "../assets/PG.webp";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Room on Rent",
      image: roomimg,
    },
    {
      id: 2,
      title: "House on Rent",
      image: pexel,
    },
    {
      id: 3,
      title: "Pg on rent",
      image: pg,
    },
  ];

  return (
    <div className="px-6 py-12 bg-gray-400">
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.2 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Our Services
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <h3 className="p-4 text-lg font-semibold text-center bg-white">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
