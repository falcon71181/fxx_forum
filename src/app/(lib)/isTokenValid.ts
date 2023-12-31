export const isTokenValid = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.ok ? { valid: true } : { valid: false };
    return data;
  } catch (error) {
    console.error(error);
    return { valid: false };
  }
};
