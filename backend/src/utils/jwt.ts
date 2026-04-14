import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
  return jwt.sign(
    { userId }, //payload
    process.env.JWT_SECRET as string, //clave secreta
    { expiresIn: "1d" }, //duración
  );
};
