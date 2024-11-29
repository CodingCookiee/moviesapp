import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: String,
  showId: String,
  type: {
    type: String,
    enum: ["movie", "show"],
    required: true,
  },
  favoriteState: {
    type: Boolean,
    default: false,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Favorite", favoriteSchema);
