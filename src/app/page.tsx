"use client";
import Image from "next/image";
import { useState } from "react";
import { FloatButton } from "antd";
import { FiBriefcase, FiSlack } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { FaRegFaceLaughSquint, FaPlus } from "react-icons/fa6";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState("GENERAL");

  // Function to handle the page content change
  const handlePageChange = (pageName: string) => {
    setSelectedPage(pageName);
  };

  // Function to render content based on the selected category
  const renderContent = () => {
    switch (selectedPage) {
      case "MEMES":
        return <div>Content for Memes</div>;
      case "TECH":
        return <div>Content for Tech</div>;
      case "ISSUE":
        return <div>Content for Issue</div>;
      case "GENERAL":
        return <div>GENERAL</div>;
    }
  };

  return (
    <main className="pt-20 flex min-h-screen min-w-screen justify-center text-6xl text-slate-300">
      <div className="w-4/5 h-screen shadow-2xl shadow-gray-600">
        <nav className="w-full h-10 bg-gray-800 rounded-t-xl">
          <ul className="h-full flex justify-evenly">
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("GENERAL")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "GENERAL" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <FiSlack />
                </span>
                <span>GENERAL</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("MEMES")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "MEMES" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <FaRegFaceLaughSquint />
                </span>
                <span>MEMES</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("TECH")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "TECH" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <PiStudentFill />
                </span>
                <span>TECH</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("ISSUE")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "ISSUE" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <FiBriefcase />
                </span>
                <span>ISSUE</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Render content based on the selected category */}
        <div className="border-2 border-red-500 w-full h-[90%] relative z-0">
          {renderContent()}
          <FloatButton
            shape="square"
            type="primary"
            style={{ position: "absolute", right: 50, bottom: 40 }}
            icon={<FaPlus />}
          />
        </div>
      </div>
    </main>
  );
}
