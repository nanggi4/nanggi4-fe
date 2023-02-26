import { useRouter } from 'next/router'
import { useState } from "react";

export const usePagination = (page: number, perPageReords: number, totalReordsCount: number) => {
  const router = useRouter();

  const countPage = (pageNum: number): number[] => {
    const startIndex = Math.floor((pageNum - 1) / perPageReords) + perPageReords;
    const lastIndex = startIndex + perPageReords - 1;
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
    const startIndex = Math.floor((pageNum - 1) / perPageReords) + 1 + perPageReords;
    const lastIndex = startIndex + perPageReords - 1;
    setCurrentPage(startIndex);
    // setDisplayPage(() => countPage(startIndex));
    router.replace(`?page=${startIndex}`);
  };

  const prev = (pageNum: number): void => {
    const startIndex = Math.floor(pageNum / perPageReords) * perPageReords + 1;
    console.log('startIndex', startIndex);
  };  

  return [
    currentPage,
    displayPage,
    changePage,
    next,
    prev
  ];
};