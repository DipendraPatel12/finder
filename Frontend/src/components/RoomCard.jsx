import { Link } from "react-router-dom";

const RoomCard = ({
  image,
  title,
  description,
  rent,
  onDetailsClick,
  post,
  showEditButton,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Room Image */}
      <img
        src={image?.url || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
      />

      {/* Room Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        {/* Full Detail Button and Rent in a row */}
        <div className="flex justify-between items-center mt-4">
          {/* Full Detail Button */}
          <button
            onClick={onDetailsClick}
            className="px-4 py-2 bg-orange-300 text-black text-sm rounded-md hover:bg-orange-400 transition-transform duration-200 hover:scale-105"
          >
            Full Detail
          </button>

          {/* Edit Button - Shown only if showEditButton is true */}
          {showEditButton && (
            <Link
              to={{
                pathname: "/createpost",
                state: { post }, // Pass the post data as state
              }}
              className="px-4 py-2 bg-orange-300 text-black text-sm rounded-md hover:bg-orange-400 transition-transform duration-200 hover:scale-105"
            >
              Edit
            </Link>
          )}
          {/* Rent Text */}
          <p className="text-sm font-semibold text-blue-600">Rent: ₹{rent}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
