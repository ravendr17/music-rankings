import * as z from 'zod';

export const songCreate = z.object({
  title: z.string().max(100),
  artist: z.string().max(100),
  playCount: z.number().min(1).max(999999)
});

export const reportCreate = z.object({
  year: z.number().min(2000).max(2999),
  month: z.number().min(1).max(12),
  totalHours: z.number().min(1).max(999999),
  songs: z.array(songCreate).min(1).max(10)
});