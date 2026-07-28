import { createResourceStore } from '@/lib/cache/createResourceStore';
import { fetchAllCategories, type Category } from './categories.api';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';
import { CATEGORIES } from '@/config/course';

const MOCK_CATEGORIES: Category[] = CATEGORIES.map((name) => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
}));

/** Shared cache for the category list — see `courses.store.ts` for why. */
export const categoriesStore = createResourceStore<Category[]>(() =>
  isMockModeEnabled() ? Promise.resolve(MOCK_CATEGORIES) : fetchAllCategories(),
);
