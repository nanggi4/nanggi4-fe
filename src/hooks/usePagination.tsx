import { useRouter } from 'next/router'
import { useState } from "react";

export const usePagination = (page: number, pageCount: number, perPageReords: number, totalReordsCount: number) => {
  const router = useRouter();
  const lastPage = Math.ceil(totalReordsCount / 10);

  const countPage = (pageNum: number): number[] => {
    const startIndex = Math.floor((pageNum - 1) / pageCount) * pageCount + 1;
    const lastIndex = startIndex + pageCount - 1 > lastPage ? lastPage : startIndex + pageCount - 1;
    return Array.from(
      { length: (lastIndex - startIndex) / 1 + 1 },
      (value, index) => startIndex + index * 1
    );
  }

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [displayPage, setDisplayPage] = useState<number[]>(() => countPage(page));

  const changePage = (pageNum: number): void => {
    setCurrentPage(pageNum);
    setDisplayPage(() => countPage(pageNum));
    router.replace(`?page=${pageNum}`);
  };

  const next = (pageNum: number): void => {
    const startIndex = Math.floor(pageNum / pageCount + 1) * pageCount + 1;
    setDisplayPage(() => countPage(startIndex));
    setCurrentPage(startIndex);
    router.replace(`?page=${startIndex}`);
  };

  const prev = (pageNum: number): void => {
    const startIndex = Math.floor(pageNum / pageCount - 1) * pageCount + 1;
    setDisplayPage(() => countPage(startIndex));
    setCurrentPage(startIndex);
    router.replace(`?page=${startIndex}`);
  };  

  return [
    currentPage,
    displayPage,
    changePage,
    next,
    prev
  ];
};