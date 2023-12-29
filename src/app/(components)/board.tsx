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
      <section className="flex relative items-center justify-between border-2 border-blue-500 min-w-screen min-h-[80px] m-4 p-2 rounded-lg">
        <div className="text-slate-300 font-extrabold text-3xl">
          {props.title}
        </div>
        <div className="flex">
          <div className="text-lg pr-3">@{postOwner}</div>
          <div className="absolute right-4 bottom-2 text-slate-300 text-[10px]">
            {props.date.toString()}
          </div>
        </div>
      </section>
    </Link>
  );
};

export default BoardCard;
