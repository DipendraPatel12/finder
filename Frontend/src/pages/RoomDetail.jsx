import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleBack = () => navigate("/rooms");
  const handleBook = () => alert("Room booked successfully!");
  const handleNextImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
    );
  const handlePrevImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );

  if (loading) return <p>Loading room details...</p>;
  if (!room) return <p>Room not found!</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-orange-300 text-white rounded-lg hover:bg-orange-300 transition duration-300"
        >
          &#8592; Back to Rooms
        </button>
        {/* <button
          onClick={handleBook}
          className="px-6 py-2 bg-orange-300 text-white rounded-lg hover:bg-orange-400 transition duration-300"
          
        >
          Book Room
        </button> */}
      </div>

      {/* Room Title */}
      <h2 className="text-4xl font-bold text-gray-900 mb-4">{room.title}</h2>

      {/* Image Slider Section */}
      <div className="relative w-full h-80 mb-6 overflow-hidden rounded-lg shadow-lg">
        <img
          src={room.images[currentImageIndex].url}
          alt={room.title}
          className="w-full h-full object-contain"
        />
        {/* Navigation Buttons */}
        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-75"
        >
          &#8249;
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-75"
        >
          &#8250;
        </button>
        {/* Image Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {room.images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Room Details Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Description Column */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700">{room.description}</p>
            <p className="text-sm text-gray-600">📍 Location: {room.location}</p>
            <p className="text-sm text-gray-600">
              🗓 Status: Available
            </p>
          </div>

          {/* Details Column */}
          <div className="space-y-4">
            <p className="text-lg text-blue-600 font-semibold">
              💰 Rent: ₹{room.rent}
            </p>
            <p className="text-sm text-gray-600">🏠 Type: {room.type}</p>
            <p className="text-sm text-gray-600">👤 Owner: {room.ownername}</p>
            <p className="text-sm text-gray-600">📞 Contact: {room.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
