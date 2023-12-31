import React from "react";

interface ReplyProps {
  leader: string;
  reply: string;
  date: Date;
}

const ReplyCard: React.FC<ReplyProps> = (props) => {
  const replyOwner = props.leader.split("@")[0];
  return (
    <main className="my-3 flex min-w-screen justify-center rounded-t-xl">
      <div className="w-4/5 shadow-2xl shadow-cyan-300">
        <section className="border-[1px] border-blue-500 w-full min-h-50 flex flex-col rounded-t-xl">
          <div className="flex flex-row justify-between p-3 bg-gray-800 text-white h-10 rounded-t-xl">
            <div className="font-heading font-medium h-full flex justify-center items-center">by @<span className="font-heading font-medium h-full flex justify-center items-center text-green-500 text-shadow-green-600 bg-[url('https://static.cracked.io/images/bg1.gif')]">{replyOwner}</span></div>
            <div className="h-full flex justify-center items-center">{props.date.toString()}</div>
          </div>
          <div className="text-sm text-slate-300 p-3 w-full h-full whitespace-pre-wrap hyphens-auto">
            {props.reply}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ReplyCard;
