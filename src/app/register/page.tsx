"use client";
import React, { useState, SyntheticEvent } from "react";
import { message } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const progressSubmit = () => {
    messageApi.open({
      type: "loading",
      content: "Registering User...",
      duration: 5,
    });
  }

  const successSubmit = () => {
    messageApi.open({
      type: "success",
      content: "Registeration Successfull...",
      duration: 3,
    });
  }

  const failSubmit = () => {
    messageApi.open({
      type: "error",
      content: "Registeration Failed...",
      duration: 10,
    });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    progressSubmit();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Password and Confirm Password don't match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email as string);
      formData.append("password", password as string);

      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      // Check if the request was successful
      if (response.ok) {
        successSubmit();
        const result = await response.json();

        localStorage.setItem("token", result.token);

        // redirecting to Home page after Register
        window.location.replace("/");
      } else {
        failSubmit();
        // Handle registration failure
        console.error("Registration failed");
      }
    } catch (error) {
      failSubmit();
      // Handle network or other errors
      console.error("Error during registration:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      {contextHolder}
      <div className="w-80 rounded-2xl bg-slate-900">
        <div className="flex flex-col gap-2 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">Register</p>
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Confirm password"
            required
          />
          <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
            Accept terms of use
            <div className="relative inline-block">
              <input
                type="checkbox"
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
            </div>
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
};

export default Register;
