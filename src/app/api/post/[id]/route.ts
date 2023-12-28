import Board from "@/app/(models)/Board";
import { connectDB, disconnectDB } from "@/app/(lib)/mongoose";

export async function GET(request: Request) {
  let post: any = {};

  // PART TIME SOLUTION
  const boardID = extractStringFromURL(request.url);

  try {
    //Wait for DB to connect
    await connectDB();

    const boardPost = await Board.find({ _id: boardID });
    post = { ...post, ...boardPost };
    console.log(post)
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
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

function extractStringFromURL(url: string) {
  const startIndex = url.indexOf('/api/post/') + '/api/post/'.length;
  const endIndex = url.length;
  return url.substring(startIndex, endIndex);
}

