import { z } from "zod";
import createContactSchema from "./schema";

export default interface IContactResponse {
  id: number;
  fullname: string;
  phone: string;
  email: string;
}

export interface ICreateContact extends z.infer<typeof createContactSchema> {}
