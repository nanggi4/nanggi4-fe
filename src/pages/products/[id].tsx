import Image from 'next/image';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Product } from '../../types/product'; 
import { GetServerSideProps } from 'next'

import { convertComma } from '../../utilities';

const ProductDetailPage: NextPage<Product> = ({ name, price, thumbnail }) => {
  return (
    <>
      <Image src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} alt={name} width={420} height={420} />
      <ProductInfoWrapper>
        <Name>{name}</Name>
        <Price>{convertComma(price)}원</Price>
      </ProductInfoWrapper>
    </>
  )
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const res = await axios.get(`https://api.sixshop.com/products/${id}`);
  const product: Product = res.data.data.product;

  if(res.status === 404 || res.status === 500) {
    return {
      notFound: true
    }
  }

  return {
    props: product
  }
}

const ProductInfoWrapper = styled.article`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 18px;
  margin-top: 8px;
`;
