import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
