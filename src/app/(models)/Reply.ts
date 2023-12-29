import mongoose, { Model, Document } from "mongoose";

const { Schema, model } = mongoose;

export type ReplyType = {
  leader: string;
  reply: string;
  date: Date;
};

export interface ReplyDocument extends Document {
  postId: string;
  replies: ReplyType[];
}

const ReplySchema = new Schema<ReplyDocument>({
  postId: {
    type: String,
    required: true,
  },
  replies: [
    {
      leader: {
        type: String,
        required: true,
      },
      reply: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

let Reply: Model<ReplyDocument>;

try {
  // Try to get the existing model
  Reply = model<ReplyDocument>("Reply");
} catch (error) {
  // Define the model if it doesn't exist
  Reply = model<ReplyDocument>("Reply", ReplySchema);
}

export default Reply;
