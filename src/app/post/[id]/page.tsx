"use client";
import React from 'react';
import { PostData } from '@/app/(lib)/postData';
import { useState, useEffect } from 'react';
import { BoardItem, BoardData } from '@/app/(lib)/boardList';
import { FaReply } from "react-icons/fa";

interface PostProps {
  params: {
    id: string;
  };
}

const Post = ({ params }: PostProps) => {
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
  return (
    <main className="pt-20 flex min-h-screen min-w-screen justify-center text-6xl text-slate-300">
      <div className="w-4/5 min-h-screen shadow-2xl shadow-cyan-300">
        <div className="w-full h-24 bg-gray-800 rounded-t-xl flex justify-between items-center p-5">
          <div className='text-2xl font-heading'>
            {/* @ts-ignore */}
            {data?.title}
          </div>
          <div className='text-sm'>
            {/* @ts-ignore */}
            {data?.date?.toString()}
          </div>
        </div>
        <section className='border-2 border-red-500 w-full min-h-20 p-3 flex text-base text-slate-300' style={{ whiteSpace: 'pre-wrap' }}>
          {/* @ts-ignore */}
          {data?.description}
        </section>
      </div>
    </main>
  );
};

export default Post;
