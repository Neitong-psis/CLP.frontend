import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Add your full name"),
  headline: z.string().max(140, "Too long").optional().or(z.literal("")),
  timezone: z.string().min(2, "Timezone is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
