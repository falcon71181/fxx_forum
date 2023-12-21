import Board from "@/app/(models)/Board";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "@/app/(lib)/mongoose";

export async function POST(request: Request) {
  let newBoard;

  try {
    // Wait for DB to connect
    await connectDB();

    // TODO - verify user using token validation

    const boardData = await request.formData();
    const title = boardData.get("title");
    const description = boardData.get("description");

    const board = await Board.findOne({ title });

    if (board) {
      return new Response("Board Already Exists", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const newBoardData = {
      title,
      description,
    };

    // Creating a new Board
    newBoard = await Board.create(newBoardData);

    return new Response("New Board Added", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.log(error);

    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } finally {
    // Disconnect from the database after the newUser operation is completed or in case of an error
    disconnectDB();
  }
}
