export interface PaginationInput {
  readonly page: number;
  readonly pageSize: number;
}

export interface PaginationResult<TItem> extends PaginationInput {
  readonly items: readonly TItem[];
  readonly total: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export function paginateCollection<TItem>(
  items: readonly TItem[],
  input: PaginationInput,
): PaginationResult<TItem> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / input.pageSize));
  const page = Math.min(Math.max(input.page, 1), totalPages);
  const startIndex = (page - 1) * input.pageSize;
  const slice = items.slice(startIndex, startIndex + input.pageSize);

  return {
    page,
    pageSize: input.pageSize,
    items: slice,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function paginationOffset(input: PaginationInput): number {
  return (Math.max(input.page, 1) - 1) * input.pageSize;
}
