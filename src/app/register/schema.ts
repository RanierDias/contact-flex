import { z } from "zod";

const registerSchema = z.object({
  username: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(8),
});

export default registerSchema;
