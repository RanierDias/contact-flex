import { z } from "zod";
import registerSchema from "./schema";

export interface IRegister extends z.infer<typeof registerSchema> {}
export interface IRegisterResponse {
  id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
}
