export type BoardItem = {
  _id: string;
  title: string;
  description: string;
  date: Date;
};

export type BoardData = {
  [key: string]: BoardItem[];
};

export const boardList = async () => {
  try {
    // make it using type window
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/board`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    // const result = filterCategory(res.json());
    const result = res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching board list:", error.message);
    throw error;
  }
};
//
// const filterCategory = (data: Record<string, any>): BoardData => {
//   const organizedData: BoardData = {
//     general: [],
//     memes: [],
//     tech: [],
//     issue: [],
//   };
//
//   for (const key in data) {
//     const item = data[key];
//     const { category, title, description, date } = item;
//
//     switch (category) {
//       case 0:
//         organizedData.general.push({ title, description, date });
//         break;
//       case 1:
//         organizedData.memes.push({ title, description, date });
//         break;
//       case 2:
//         organizedData.tech.push({ title, description, date });
//         break;
//       case 3:
//         organizedData.issue.push({ title, description, date });
//         break;
//       default:
//         organizedData.general.push({ title, description, date });
//         break;
//     }
//   }
//
//   return organizedData;
// }
