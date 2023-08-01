import { z } from "zod";

const contactSchema = z.object({
  fullname: z.string(),
  phone: z.string().max(10),
  email: z.string().email().optional(),
});

export default contactSchema;
