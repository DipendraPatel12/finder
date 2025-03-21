// frontend/src/pages/RoomList.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import RoomCard from "../components/RoomCard"; // Assuming RoomCard is in the components folder
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
console.log(apiUrl);
const RoomList = () => {
  const [rooms, setRooms] = useState([]); // State to store rooms
  const [filter, setFilter] = useState("All"); // State to manage selected filter
  const [loading, setLoading] = useState(true); // State for loading indicator

  const filters = ["All", "PG", "House", "Room"];

  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Fetch data from API
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/room/all`);

        setRooms(response.data.rooms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filtered data based on selected filter
  const filteredRooms =
    filter === "All" ? rooms : rooms.filter((room) => room.type === filter);

    return (
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <div className="p-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {filters.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium border 
                  ${
                    filter === type
                      ? "bg-orange-300 text-black"
                      : "bg-gray-100 text-gray-700"
                  } 
                   hover:bg-orange-300 hover:text-white transition-all duration-300 transform hover:scale-105`}
              >
                {type}
              </button>
            ))}
          </div>
    
          {/* Room Cards Grid */}
          {loading ? (
            <p className="text-center text-gray-600">Loading rooms...</p>
          ) : filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room._id}
                  image={room.images[0]}
                  title={room.title}
                  description={room.description}
                  rent={room.rent}
                  onDetailsClick={() => navigate(`/room/${room._id}`)}
                  className="transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No rooms available for the selected filter.
            </p>
          )}
        </div>
      </div>
    );
    
};

export default RoomList;
