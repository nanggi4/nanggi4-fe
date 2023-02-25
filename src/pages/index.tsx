import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { Products } from '../types/product';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const HomePage: NextPage<Products> = ({products, totalCount}) => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <>
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const req = await axios.get(`https://api.sixshop.com/products?page=1&size=10`);
  const products = req.data.data;

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