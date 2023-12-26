import User from "@/app/(models)/User";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "@/app/(lib)/mongoose";
import { genSalt, hash } from "bcrypt";
import { createToken } from "@/app/(lib)/token";

export async function POST(request: Request) {
  let newUser;

  try {
    // wait for DB to connect
    await connectDB();

    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await User.findOne({ email });

    if (user) {
      return new Response("User Already Exists", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const salt = await genSalt(12);
    const hashedPassword = await hash(password as string, salt);

    const newUserData = {
      email,
      password: hashedPassword,
    };

    // Creating a new user
    newUser = await User.create(newUserData);

    const token = createToken(newUser.email);

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
    // Disconnect from the database after the newUser operation is completed or in case of an error
    disconnectDB();
  }
}
