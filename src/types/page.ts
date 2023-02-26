export type PageType = {
  selected: boolean;
};

export type PaginationType = {
  page: number;
  currentPage: number | number[] | ((pageNum: number) => void);
  displayPage: number | number[] | ((pageNum: number) => void);
  changePage: number | number[] | ((pageNum: number) => void);
  next: number | number[] | ((pageNum: number) => void);
  prev: number | number[] | ((pageNum: number) => void);
};