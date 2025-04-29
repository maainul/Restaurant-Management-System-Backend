import jwt from "jsonwebtoken";


export const createAccessToken = (id: string, email: string, username: string, role: string, tokenVersion: number):string =>{
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET) throw new Error('Missing token secret')
  return jwt.sign({ userId: id, email, username, role, tokenVersion }, ACCESS_TOKEN_SECRET, { expiresIn: "59m" });
}

export const createRefreshToken = (id: string, email: string, username: string, role: string, tokenVersion: number):string => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  if (!REFRESH_TOKEN_SECRET) throw new Error('Missing token secret')
  return jwt.sign({userId: id,email,username,role,tokenVersion},REFRESH_TOKEN_SECRET,{ expiresIn: "7d" });
}
