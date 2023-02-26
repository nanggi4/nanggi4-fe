export type PageType = {
  selected: boolean;
};

export type PaginationType = {
  page: number;
  currentPage: number;
  displayPage: number[];
  changePage: (pageNum: number) => void;
  next: () => void;
  prev: () => void;
};