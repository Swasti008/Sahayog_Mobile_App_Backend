import { z } from 'zod';


export const FeedSchemaValidation = z.object({
  userId: z.string().uuid(), 
  userName: z.string().min(1, "User name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  time: z.date().optional(), 
});
