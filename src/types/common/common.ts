export interface Common {
  id: number;
  createdAt: string;
  updatedAt: string;
  skuCode?: string;
}

export interface Imeta {
  page?: number;
  take?: number;
  count?: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
