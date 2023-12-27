import React, { useEffect, useState } from 'react';
import { boardList } from '../(lib)/boardList';
import BoardCard from "./board";

interface BoardData {
  _id: string;
  title: string;
  date: string;
}
interface BoardCategoryProps {
  category: string;
}

const BoardCategory: React.FC<BoardCategoryProps> = ({ category }) => {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await boardList();
        setBoards(data[category]);
      } catch (error: any) {
        console.error(`Error fetching ${category} board list:`, error.message);
      }
    };

    fetchData();
  }, [category]);

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
};

export const GeneralCateg: React.FC = () => <BoardCategory category="general" />;
export const MemeCateg: React.FC = () => <BoardCategory category="memes" />;
export const TechCateg: React.FC = () => <BoardCategory category="tech" />;
export const IssueCateg: React.FC = () => <BoardCategory category="issue" />;

