import Link from "next/link";
import React from "react";

interface BoardProps {
  _id: string;
  leader: string;
  title: string;
  date: Date;
}

const BoardCard: React.FC<BoardProps> = (props) => {
  const postOwner = props.leader.split("@")[0];
  return (
    <Link href={`/post/${props._id}`}>
      <section className="flex relative items-center justify-between border-2 border-blue-800 hover:border-blue-500 bg-slate-800 hover:bg-gray-900 min-w-screen min-h-[80px] m-3 navHide:m-4 p-1 navHide:p-2 rounded-lg">
        <div className="text-slate-300 font-extrabold text-lg tablet:text-xl navHide:text-3xl">
          {props.title}
        </div>
        <div className="flex">
          <div className="text-sm tablet:base navHide:text-lg pr-3">@<span className="text-sm tablet:text-base navHide:text-lg text-green-500 text-shadow-green-600 bg-[url('https://static.cracked.io/images/bg1.gif')]">{postOwner}</span></div>
          <div className="absolute right-4 bottom-2 text-slate-300 text-[6px] tablet:text-[8px] navHide:text-[10px]">
            {props.date.toString()}
          </div>
        </div>
      </section>
    </Link>
  );
};

export default BoardCard;
