import mongoose, { Model, Document } from "mongoose";

const { Schema, model } = mongoose;

type BoardType = {
  category: number;
  title: string;
  description: string;
  date: Date;
} & Document;

const BoardSchema = new Schema<BoardType>({
  category: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let Board: Model<BoardType>;

try {
  // Try to get the existing model
  Board = model("Board") as Model<BoardType>;
} catch (error) {
  // Define the model if it doesn't exist
  Board = model<BoardType>("Board", BoardSchema);
}

export default Board;
