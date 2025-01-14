import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for image slider

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/room/${id}`);
        setRoom(response.data.room);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [id]);

  const handleBack = () => {
    navigate("/rooms");
  };

  const handleBook = () => {
    alert("Room booked successfully!");
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <p>Loading room details...</p>;
  }

  if (!room) {
    return <p>Room not found!</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header with Back and Book buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-orange-300 text-black rounded-md hover:bg-orange-400 transition duration-300"
        >
          Back to Rooms
        </button>
        <button
          onClick={handleBook}
          className="px-4 py-2 bg-orange-300 text-black rounded-md hover:bg-orange-400 transition duration-300"
        >
          Book Room
        </button>
      </div>

      {/* Room Detail Box */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{room.title}</h2>

        {/* Image Slider */}
        <div className="relative w-full h-64 mb-6">
          <img
            src={room.images[currentImageIndex].url}
            alt={room.title}
            className="w-full h-full object-contain rounded-lg"
          />
          {/* Previous Button */}
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full hover:bg-opacity-75"
          >
            &#8249;
          </button>
          {/* Next Button */}
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full hover:bg-opacity-75"
          >
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Description */}
          <div className="space-y-4">
            <p className="text-lg text-gray-800">{room.description}</p>
            <p className="text-sm text-gray-600">Location: {room.location}</p>
            <p className="text-sm text-gray-600">
              Available from: {room.availableFrom}
            </p>
          </div>

          {/* Room Details */}
          <div className="space-y-4">
            <p className="text-lg text-blue-600 font-semibold">
              Rent: ₹{room.rent}
            </p>
            <p className="text-sm text-gray-600">Type: {room.type}</p>
            <p className="text-sm text-gray-600">Owner: {room.ownername}</p>
            <p className="text-sm text-gray-600">Contact: {room.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
