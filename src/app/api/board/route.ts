import Board from "@/app/(models)/Board";
import { connectDB, disconnectDB } from "@/app/(lib)/mongoose";

export async function POST(request: Request) {
  let newBoard;

  try {
    // Wait for DB to connect
    await connectDB();

    // TODO - verify user using token validation

    const boardData = await request.formData();
    const category = boardData.get("identifier");
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
      category,
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
export async function GET(request: Request) {
  let boardList: any = {};

  try {
    // wait for DB to connect
    await connectDB();

    const allBoards = await Board.find({});

    // Append data to boardList
    boardList = { ...boardList, ...allBoards };
    const responseBody = JSON.stringify(boardList);

    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
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
