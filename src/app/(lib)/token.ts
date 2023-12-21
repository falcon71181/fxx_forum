import jwt from "jsonwebtoken";

const JWT_Secret = process.env.JWT_SECRET as string;

export const createToken = (email: string) => {
  const token = jwt.sign({ email }, JWT_Secret, { expiresIn: "1h" });

  return token;
};
