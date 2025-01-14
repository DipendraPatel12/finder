import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreatePost = () => {
  const { userId, token } = useAuth();
  console.log("Token from Context:", token);
  console.log("UserId from Context:", userId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [type, setType] = useState("Room");
  const [contact, setContact] = useState("");
  const [ownername, setOwnername] = useState("");
  const [images, setImages] = useState([]);
  const { state } = useLocation(); // Receiving post details via state
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.post) {
      const post = state.post;
      setTitle(post.title);
      setDescription(post.description);
      setLocation(post.location);
      setRent(post.rent);
      setType(post.type);
      setContact(post.contact);
      setOwnername(post.ownername);
      // If the post has images, set them (assuming images are URL links)
      setImages(post.images);
    }
  }, [state]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !location ||
      !rent ||
      !contact ||
      !ownername
    ) {
      return toast.error("Please fill all the required fields.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("rent", rent);
    formData.append("type", type);
    formData.append("contact", contact);
    formData.append("ownername", ownername);
    formData.append("postBy", userId);

    images.forEach((image) => formData.append("images", image));

    try {
      console.log("JWT Token:", token); // Log token to ensure it's available
      if (!token) {
        return toast.error("Authentication token is missing.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const config = {
        headers,
        withCredentials: true, // Ensure cookies are sent
      };
      console.log("Request Headers:", headers); // Log headers to ensure cookies are sent

      if (state?.post) {
        // Update post if it's an edit operation
        await axios.put(
          `${apiUrl}/api/room/update/${state.post._id}`,
          formData,
          config
        );
        toast.success("Post updated successfully!");
      } else {
        // Create new post
        await axios.post(`${apiUrl}/api/room/create`, formData, config);
        toast.success("Post created successfully!");
      }
      navigate("/rooms");
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        {state?.post ? "Edit Post" : "New Post"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Owner Name and Title on the same line */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Owner Name
            </label>
            <input
              type="text"
              value={ownername}
              onChange={(e) => setOwnername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter owner's name"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter room title"
            />
          </div>
        </div>

        {/* Description and Type on the same line */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter room description"
            ></textarea>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Room">Room</option>

              <option value="House">Hostel</option>
              <option value="PG">PG</option>
            </select>
          </div>
        </div>

        {/* Location and Rent on the same line */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter room location"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Rent (₹)
            </label>
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter room rent"
            />
          </div>
        </div>

        {/* Contact and Image Upload on the same line */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Contact
            </label>
            <input
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your contact"
              minLength={10}
              maxLength={10}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500 transition duration-200"
        >
          {state?.post ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
