import { useRouter } from 'next/router'
import { useState } from "react";

export const usePagination = (perPageReords: number, totalReordsCount: number) => {
  console.log(totalReordsCount);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayPage, setDisplayPage] = useState<number[]>([1,2,3,4,5]);

  const countPage = (pageNum: number): number[] => {
    return [6,7,8,9,10];
  }

  const changePage = (pageNum: number): void => {
    setCurrentPage(pageNum);
    setDisplayPage(() => countPage(pageNum));
    router.replace(`?page=${pageNum}`);
  };

  const next = (): void => {
    console.log('currentPage', currentPage);
  };

  const prev = () => {
    console.log('currentPage', currentPage);
  };  

  return [
    currentPage,
    displayPage,
    changePage,
    next,
    prev
  ];
};