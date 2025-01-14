import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    postBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Referencing the User model
      required: true,
    },
    ownername: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    contact: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

roomSchema.index({ postBy: 1 }); // Optional: Index for faster queries by postBy

const Room = mongoose.model('Room', roomSchema);

export default Room;
