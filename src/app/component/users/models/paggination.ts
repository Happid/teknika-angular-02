export interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export class Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;

  constructor(options: PaginationOptions) {
    this.currentPage = options.currentPage;
    this.itemsPerPage = options.itemsPerPage;
    this.totalItems = options.totalItems;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.totalItems - 1);
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
    }
  }
}