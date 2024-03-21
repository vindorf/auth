import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const User = models.User || model('User', userSchema);

export default User;
