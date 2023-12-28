export const isTokenValid = async (token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // @ts-ignore
    const data = response.ok ? { valid: true, email: response["payload"]["email"] } : { valid: false };
    return data;
  } catch (error: any) {
    console.error(error);
    return { valid: false };
  }
}
