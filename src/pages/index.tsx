import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import type { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { Products } from '../types/product';
import { PaginationType } from '../types/page';
import { usePagination } from "../hooks/usePagination";

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const HomePage: NextPage<Products> = ({products, totalCount}) => {
  const router = useRouter();
  const page = router.query.page === undefined ? 1 : Number(router.query.page);

  const perPageReords = 10;
  const pageCount = 5;

  const [
    currentPage,
    displayPage,
    changePage,
    next,
    prev
  ] = usePagination(page, pageCount, perPageReords, totalCount);

  return (
    <>
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination
          page={page} 
          currentPage={currentPage}
          displayPage={displayPage}
          changePage={changePage}
          next={next}
          prev={prev}
        />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const page = context.query.page === undefined ? 1 : context.query.page;
    const res: AxiosResponse<any, any> = await axios.get(`${process.env.NEXT_PUBLIC_SIXSHOP_API_ENDPONIT}/products?page=${page}&size=10`);
    const products: Products = res.data.data;
    return {
      props: products
    }    
  } catch (error) {
    return {
      notFound: true
    }
  }  
}

export default HomePage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;