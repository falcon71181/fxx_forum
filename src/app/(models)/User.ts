import mongoose, { Model, Document } from "mongoose";

const { Schema, model } = mongoose;

type UserType = {
  email: string;
  password: string;
  date: Date;
} & Document;

const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let User: Model<UserType>;

try {
  // Try to get the existing model
  User = model("User") as Model<UserType>;
} catch (error) {
  // Define the model if it doesn't exist
  User = model<UserType>("User", UserSchema);
}

export default User;
