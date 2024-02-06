export interface Common {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Imeta {
  page?: number;
  take?: number;
  count?: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface IListHeader {
  title: string;
  dtoKey?: string;
  isHidden?: boolean;
}
