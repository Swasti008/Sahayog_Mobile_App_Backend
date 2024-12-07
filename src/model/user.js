import { z } from 'zod';


export const UserSchemaValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
  belongsToOrganization: z.boolean(),
  organizationSector: z.string().optional().refine(value => value || !z.string().length, {
    message: "Organization sector is required if belongsToOrganization is true",
  }),
});
