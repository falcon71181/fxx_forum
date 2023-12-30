"use client";
import React from "react";
import { PostData } from "@/app/(lib)/postData";
import { useState, useEffect } from "react";
import { BoardItem, BoardData } from "@/app/(lib)/boardList";
import { FloatButton } from "antd";
import { FaReply } from "react-icons/fa";
import BoardLoading from "@/app/(components)/loading";
import { isTokenValid } from "@/app/(lib)/isTokenValid";
import { replyList } from "@/app/(lib)/replyList";
import ReplyCard from "@/app/(components)/Reply";
import { ReplyType } from "@/app/(models)/Reply";

interface PostProps {
  params: {
    id: string;
  };
}

interface Reply {
  leader: string;
  reply: string;
  date: Date;
}

interface ReplyDataI {
  replies: Reply[];
  postId: string;
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

  const [replyData, setReply] = useState<ReplyDataI>();
  const [replyLoading, setReplyLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setReplyLoading(true);

        const result = await replyList(params.id);
        const replies = result[0];

        setReply(replies);
      } catch (error: any) {
        console.error("Error fetching reply list:", error.message);
      } finally {
        // Set loading to false when fetch is completed (either success or error)
        setReplyLoading(false);
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
    <main className="pt-20 flex flex-col min-h-screen w-full">
      <div className="w-full h-full flex justify-center items-center rounded-t-xl">
        {postLoading ? (
          <section className="w-full h-full flex justify-center items-center">
            <BoardLoading />
          </section>
        ) : (
          <div className="w-4/5 min-h-50 shadow-2xl shadow-cyan-300 rounded-t-xl border-2 border-grey-800">
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
            <section className="w-full min-h-20 p-3 flex text-base text-slate-300 whitespace-pre-wrap hyphens-auto">
              {/* @ts-ignore */}
              {data?.description}
            </section>
          </div>
        )}
      </div>
      {replyData && (
        replyData.replies.map((reply: ReplyType) => (
          <ReplyCard
            key={reply.date.toString()}
            leader={reply.leader}
            reply={reply.reply}
            date={reply.date}
          />
        ))
      )}

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
