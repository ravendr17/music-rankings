import {z} from "zod";

export const songSchema = z.object({
  title: z.string()
    .min(1, 'Title is required.')
    .max(100, 'Title cannot exceed 100 characters.'),
  artist: z.string()
    .min(1, 'Artist is required.')
    .max(100, 'Artist cannot exceed 100 characters.'),
  playCount: z.coerce.number()
    .min(1, 'Play count is required.')
    .max(999999, 'Play count cannot exceed 999999.')
});

export const reportSchema = z.object({
  year: z.coerce.number()
    .min(2000, 'Year (2000+) is required.')
    .max(2999, 'Year cannot exceed 2999.'),
  month: z.number()
    .min(1)
    .max(12),
  totalHours: z.coerce.number()
    .min(1)
    .max(999999, 'Total hours cannot exceed 999999.')
    .optional(),
  songs: z.array(songSchema)
    .min(1, 'At least 1 song is required.')
    .max(10, 'Only 10 songs are allowed.')
});

export type Report = z.infer<typeof reportSchema>;