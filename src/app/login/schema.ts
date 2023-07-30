import { z } from "zod";

const loginSchema = z.object({
  credential: z.string(),
  password: z.string().min(8),
});

export default loginSchema;
