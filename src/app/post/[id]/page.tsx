"use client";
import React from "react";
import { PostData } from "@/app/(lib)/postData";
import { useState, useEffect } from "react";
import { BoardItem, BoardData } from "@/app/(lib)/boardList";
import { FloatButton } from "antd";
import { FaReply } from "react-icons/fa";
import BoardLoading from "@/app/(components)/loading";
import { isTokenValid } from "@/app/(lib)/isTokenValid";

interface PostProps {
  params: {
    id: string;
  };
}

const Post = ({ params }: PostProps) => {
  const [isValidSession, setIsValidSession] = useState(false);

  const [data, setData] = useState<BoardData[]>([]);
  const [postLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        const result = await PostData(params.id);
        // @ts-ignore
        const dataArray = Object.values(result);
        // @ts-ignore
        setData(dataArray[0]);
      } catch (error: any) {
        console.error("Error fetching board list:", error.message);
      } finally {
        // Set loading to false when fetch is completed (either success or error)
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const isTokenExist = localStorage.getItem("token");
      if (isTokenExist == null) {
        return;
      }

      try {
        const domain =
          typeof window !== "undefined" ? window.location.hostname : "";
        const data = await isTokenValid();
        setIsValidSession(data.valid);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // @ts-ignore
  const postOwner = data?.leader?.split("@")[0];
  return (
    <main className="pt-20 flex min-h-screen min-w-screen justify-center text-6xl text-slate-300">
      <div className="w-4/5 min-h-screen shadow-2xl shadow-cyan-300">
        {postLoading ? (
          <section className="w-full h-full flex justify-center items-center">
            <BoardLoading />
          </section>
        ) : (
          <div>
            <div className="w-full h-24 bg-gray-800 rounded-t-xl flex justify-between items-center p-5">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-heading font-extrabold">
                  {/* @ts-ignore */}
                  {data?.title}
                </div>
                <div className="text-lg">By : @{postOwner}</div>
              </div>
              <div className="text-sm">
                {/* @ts-ignore */}
                {data?.date?.toString()}
              </div>
            </div>
            <section className="border-[1px] border-gray-800 w-full min-h-20 p-3 flex text-base text-slate-300 whitespace-pre-wrap hyphens-auto">
              {/* @ts-ignore */}
              {data?.description}
            </section>
          </div>
        )}
      </div>
      {isValidSession && (
        <FloatButton
          shape="square"
          type="primary"
          style={{ position: "fixed", right: 50, bottom: 50 }}
          icon={<FaReply />}
        />
      )}
    </main>
  );
};

export default Post;
