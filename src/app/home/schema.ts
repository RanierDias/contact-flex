import { z } from "zod";

const createContactSchema = z.object({
  fullname: z.string(),
  phone: z.string().max(10),
  email: z.string().email().optional(),
});

export default createContactSchema;
