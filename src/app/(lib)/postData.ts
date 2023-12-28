export const PostData = async (id: string) => {
  try {
    // make it using type window
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    const result = res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching Post Data:", error.message);
    throw error;
  }
};

