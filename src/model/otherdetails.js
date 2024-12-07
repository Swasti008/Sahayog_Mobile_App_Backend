import { z } from 'zod';


const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  time: z.date().optional(),
  description: z.string().min(1, "Description is required"),
});

export const OtherDetailsSchemaValidation = z.object({
  userId: z.string().uuid("Invalid user ID format"), 
  liveLocation: z.string().min(1, "Live Location is required"),
  posts: z.array(PostSchema).min(1, "At least one post is required"),
});
