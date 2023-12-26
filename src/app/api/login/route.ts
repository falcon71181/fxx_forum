import User from "@/app/(models)/User";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "@/app/(lib)/mongoose";
import { compare } from "bcrypt";
import { createToken } from "@/app/(lib)/token";

export async function POST(request: Request) {
  try {
    // wait for DB to connect
    await connectDB();

    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await User.findOne({ email });

    if (!user) {
      return new Response("User doesn't exist", {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const correctPassword = await compare(password as string, user.password);

    if (!correctPassword) {
      return new Response("Wrong Password", {
        status: 401,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const token = createToken(email as string);

    return new Response(JSON.stringify({ token }), {
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
    // Make sure to disconnect from the database in case of any error
    disconnectDB();
  }
}
