import Reply, { ReplyType } from "@/app/(models)/Reply";
import { connectDB, disconnectDB } from "@/app/(lib)/mongoose";
import { isTokenValid } from "../../board/isTokenValid";

export async function POST(request: Request) {
  // Token Verification
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return new Response("No JWT Token ", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // Split the Authorization header to get the token part
  const [bearer, token] = authorization.split(" ");

  // Check if the header is in the expected "Bearer <token>" format
  if (bearer !== "Bearer" || !token) {
    return new Response("Invalid Authorization header format", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const checkToken = await isTokenValid(token);
  if (!checkToken.valid) {
    return new Response("JWT Token Invalid", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const postId = extractStringFromURL(request.url);
  const leader = checkToken.email;

  try {
    // wait for DB to connect
    await connectDB();

    const formData = await request.formData();
    const reply: string = formData.get("reply") as string;

    const replyObj = {
      leader: leader,
      reply: reply,
      date: new Date(),
    };

    const userReply = await Reply.findOne({ postId });

    if (userReply) {
      // Append replyObj to replies array
      userReply.replies.push(replyObj);
      await userReply.save();
    } else {
      const newReplyData = {
        postId: postId,
        replies: [replyObj],
      };
      await Reply.create(newReplyData);
    }

    return new Response("Reply added successfully", {
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
    // Disconnect from the database after the operation is completed or in case of an error
    disconnectDB();
  }
}

function extractStringFromURL(url: string) {
  const startIndex = url.indexOf('/api/reply/') + '/api/reply/'.length;
  const endIndex = url.length;
  return url.substring(startIndex, endIndex);
}

