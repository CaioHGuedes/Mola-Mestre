import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAuth(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded as { id: string };
}
