export interface Common {
  id: number;
  createdAt: Date;
  updatedAt: Date;
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
