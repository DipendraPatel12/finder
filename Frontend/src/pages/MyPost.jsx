import { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserIdFromCookie = () => {
    const userId = Cookies.get("userId");
    return userId || null;
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userId = getUserIdFromCookie();
      if (!userId) {
        console.error("User ID not found in cookies");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [token]);

  const handleEditClick = (post) => {
    navigate("/createpost", { state: { post } }); // Passing post details to the CreatePost page
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Posts</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center">You haven&apos;t created any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="relative">
              <RoomCard
                image={post.images[0]}
                title={post.title}
                description={post.description}
                rent={post.rent}
                onDetailsClick={() => navigate(`/room/${post._id}`)
                }
              />
              {/* Edit button */}
              <button
                onClick={() => handleEditClick(post)}
                className="absolute top-2 right-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPost;
