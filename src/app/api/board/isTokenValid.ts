export const isTokenValid = async (token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // @ts-ignore
    const data = response.ok ? { email: response["payload"]["email"] } : { email: null };
    return data;
  } catch (error: any) {
    console.error(error);
    return { email: null };
  }
}
