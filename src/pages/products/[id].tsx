import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Product } from '../../types/product'; 
import { GetServerSideProps } from 'next'

import { convertComma } from '../../utilities';

const ProductDetailPage: NextPage<Product> = (product) => {
  console.log('123', product);
  return (
    <>
      <Image src={'/defaultThumbnail.jpg'} alt="test" width="100%" height={420} />
      <ProductInfoWrapper>
        <Name>{product.name}</Name>
        <Price>{convertComma(product.price)}원</Price>
      </ProductInfoWrapper>
    </>
  )
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const data = await axios.get(`https://api.sixshop.com/products/${id}`);
  const product = data.data.data.product;

  return {
    props: {
      product
    }
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
