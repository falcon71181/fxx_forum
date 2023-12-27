import Link from 'next/link';
import React from 'react';

interface BoardProps {
  title: string;
  date: Date;
}

const BoardCard: React.FC<BoardProps> = (props) => {
  return (
    <Link href="/">
      <section className='flex relative items-center border-2 border-blue-500 min-w-screen min-h-[80px] m-4 p-2 rounded-lg'>
        <div className='text-slate-300 font-extrabold text-3xl'>{props.title}</div>
        <div className='absolute right-5 bottom-2 text-slate-300 text-sm'>{props.date.toString()}</div>
      </section>
    </Link>
  );
};

export default BoardCard;
