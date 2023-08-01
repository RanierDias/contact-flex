import { z } from "zod";
import contactSchema from "./schema";

export default interface IContactResponse {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  createdBy: number;
}

export interface ICreateContact extends z.infer<typeof contactSchema> {}
