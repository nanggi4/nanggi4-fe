import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import type { GetServerSideProps } from 'next'
import type { NextPage } from 'next';

import products from '../api/data/products.json';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <>
      <Header />
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  console.log(123123);
  const data = await axios.get('https://api.sixshop.com/products?page=1&size=10');
  console.log('data', data);
  if(data.status === 200) {
    console.log(data);
  }

  return {
    props: {
      order: {
        firstName: 'Donald',
        lastName: 'Duck',
        orderNo: 'DL100'
      }
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
