import React, { useEffect, useState } from 'react';
import { boardList } from '../(lib)/boardList';
import BoardCard from "./board";

interface BoardData {
  _id: string;
  title: string;
  date: string;
}

const GeneralCateg = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await boardList();
        setBoards(data.general);
      } catch (error: any) {
        console.error('Error fetching board list:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {boards.map((boardData) => (
        <BoardCard
          key={boardData._id}
          title={boardData.title}
          date={new Date(boardData.date)}
        />
      ))}
    </div>
  );
}


const MemeCateg = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await boardList();
        setBoards(data.memes);
      } catch (error: any) {
        console.error('Error fetching board list:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {boards.map((boardData) => (
        <BoardCard
          key={boardData._id}
          title={boardData.title}
          date={new Date(boardData.date)}
        />
      ))}
    </div>
  );
}


const TechCateg = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await boardList();
        setBoards(data.tech);
      } catch (error: any) {
        console.error('Error fetching board list:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {boards.map((boardData) => (
        <BoardCard
          key={boardData._id}
          title={boardData.title}
          date={new Date(boardData.date)}
        />
      ))}
    </div>
  );
}


const IssueCateg = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await boardList();
        setBoards(data.issue);
      } catch (error: any) {
        console.error('Error fetching board list:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {boards.map((boardData) => (
        <BoardCard
          key={boardData._id}
          title={boardData.title}
          date={new Date(boardData.date)}
        />
      ))}
    </div>
  );
}

export { GeneralCateg, MemeCateg, TechCateg, IssueCateg };
