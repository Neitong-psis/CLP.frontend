import { z } from 'zod';
import { http } from '@/lib/api/http';
import { normalizeError } from '@/lib/api/errors';

const CATEGORIES_ENDPOINT = '/categories';

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

const categoriesPageSchema = z.object({
  data: z.array(categorySchema),
  hasNextPage: z.boolean(),
});

export type Category = z.infer<typeof categorySchema>;

const MAX_PAGE_LIMIT = 50;
const MAX_PAGES = 100;

/** Walks all pages of /categories and returns the flat list. */
export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const all: Category[] = [];
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const { data } = await http.get<unknown>(CATEGORIES_ENDPOINT, {
        params: { page, limit: MAX_PAGE_LIMIT },
      });
      const parsed = categoriesPageSchema.parse(data);
      all.push(...parsed.data);
      if (!parsed.hasNextPage) break;
    }
    return all;
  } catch (error) {
    throw normalizeError(error);
  }
}
