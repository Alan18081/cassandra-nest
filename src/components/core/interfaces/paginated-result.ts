export interface PaginatedResult<T> {
    data: T[];
    lastCreatedAt: Date;
    itemsPerPage: number;
    totalCount: number;
    totalPages: number;
}