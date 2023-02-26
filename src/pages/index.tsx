import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import type { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { Products } from '../types/product';
import { usePagination } from "../hooks/usePagination";

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const HomePage: NextPage<Products> = ({products, totalCount}) => {
  const router = useRouter();
  const page = router.query.page === undefined ? 1 : Number(router.query.page);

  const [
    currentPage,
    displayPage,
    changePage,
    next,
    prev
  ] = usePagination(page, 5, totalCount);  

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
  const page = context.query.page === undefined ? 1 : context.query.page;
  const res: AxiosResponse<any, any> = await axios.get(`https://api.sixshop.com/products?page=${page}&size=10`);
  const products: Products = res.data.data;

  if(!res) {
    return {
      notFound: true
    }
  }

  return {
    props: products
  }
}

export default HomePage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;