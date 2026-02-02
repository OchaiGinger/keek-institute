import * as z from "zod";

export const courseLevelEnum = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const CourseStatusEnum = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title must be at most 100 characters."),
  description: z.string().min(3, "Description must be at least 3 characters."),
  fileKey: z.string().min(1, "File key is required."),
  price: z.coerce.number().min(1, "Price must be at least 1."),
  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 minute.")
    .max(600, "Duration must be at most 600 minutes."),
  level: z.enum(courseLevelEnum),
  smallDescription: z
    .string()
    .min(3, "Small description must be at least 3 characters.")
    .max(255, "Small description must be at most 255 characters."),
  slug: z.string().min(3, "Title must be at least 3 characters."),
  category: z.enum(courseCategories, { message: "Category is required." }),
  status: z.enum(CourseStatusEnum, {
    message: "Course status is required.",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
