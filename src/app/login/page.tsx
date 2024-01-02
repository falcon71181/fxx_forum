"use client";
import React, { useState, SyntheticEvent } from "react";
import { message } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const progressSubmit = () => {
    messageApi.open({
      type: "loading",
      content: "Login in process...",
      duration: 5,
    })
  }

  const successSubmit = () => {
    messageApi.open({
      type: "success",
      content: "Login successfull",
      duration: 3,
    });
  }

  const failSubmit = () => {
    messageApi.open({
      type: "error",
      content: "Login Failed...",
      duration: 10,
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    progressSubmit();
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email as string);
      formData.append("password", password as string);

      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      // Check if the request was successful
      if (response.ok) {
        successSubmit();
        const result = await response.json();

        localStorage.setItem("token", result.token);

        // redirecting to Home page after Login
        window.location.replace("/");
      } else {
        failSubmit();
        // Handle Login failure
        console.error("Login failed");
      }
    } catch (error) {
      failSubmit();
      // Handle network or other errors
      console.error("Error during login:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      {contextHolder}
      <div className="w-80 rounded-2xl bg-slate-900">
        <div className="flex flex-col gap-2 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">Login</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
};

export default Register;
