type BoardItem = {
  title: string;
  description: string;
  date: Date;
};

type OrganizedData = {
  general: BoardItem[];
  memes: BoardItem[];
  tech: BoardItem[];
  issue: BoardItem[];
};

export const boardList = async () => {
  try {
    const res = await fetch("/api/board", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // If the response status is not ok, throw an error
      throw new Error(`Error: ${res.statusText}`);
    }

    const result = filterCategory(await res.json());
    return result;
  } catch (error: any) {
    console.error("Error fetching board list:", error.message);
    throw error;
  }
};

const filterCategory = (data: Record<string, any>): OrganizedData => {
  const organizedData: OrganizedData = {
    general: [],
    memes: [],
    tech: [],
    issue: [],
  };

  for (const key in data) {
    const item = data[key];
    const { category, title, description, date } = item;

    switch (category) {
      case 0:
        organizedData.general.push({ title, description, date });
        break;
      case 1:
        organizedData.memes.push({ title, description, date });
        break;
      case 2:
        organizedData.tech.push({ title, description, date });
        break;
      case 3:
        organizedData.issue.push({ title, description, date });
        break;
      default:
        organizedData.general.push({ title, description, date });
        break;
    }
  }

  return organizedData;
};
