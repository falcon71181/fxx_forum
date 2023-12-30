export const replyList = async (postId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/reply/${postId}`, {
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
    console.error("Error fetching reply list:", error.message);
    throw error;
  }
};
