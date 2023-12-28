import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/app/(models)/User";
import { connectDB, disconnectDB } from "@/app/(lib)/mongoose";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const JWT_Secret = process.env.JWT_SECRET as string;

  // type Payload = JwtPayload & { email: string };

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

  try {
    await connectDB();

    const payload = jwt.verify(token, JWT_Secret);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return new Response("User doesn't exist", {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    return new Response(JSON.stringify({ payload }), {
      status: 200,
      headers: {
        "Content-Type": "text/json",
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
    // Make sure to disconnect from the database in case of any error
    disconnectDB();
  }
}
