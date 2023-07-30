import { z } from "zod";
import loginSchema from "./schema";

export interface ILogin extends z.infer<typeof loginSchema> {}
export interface ILoginResponse {
  token: string;
}
