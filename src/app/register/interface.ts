import { z } from "zod";
import userSchema from "./schema";

export interface IUser extends z.infer<typeof userSchema> {}
export interface IUserResponse {
  id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
}
