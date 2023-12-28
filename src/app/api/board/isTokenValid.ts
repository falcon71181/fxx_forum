export const isTokenValid = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/validate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const responseBody = await response.json();
    const email = responseBody.payload.email || null;
    // @ts-ignore
    const data = response.ok
      ? // @ts-ignore
        { valid: true, email: email }
      : { valid: false };
    return data;
  } catch (error: any) {
    console.error(error);
    return { valid: false };
  }
};
