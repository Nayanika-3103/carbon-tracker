import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  carbon: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;