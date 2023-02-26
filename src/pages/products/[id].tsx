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
  try {
    const id = context.query.id;
    const res = await axios.get(`${process.env.SIXSHOP_API_ENDPONIT}/products/${id}`);
    const product: Product = res.data.data.product;
    return {
      props: product
    }    
  } catch (error) {
    return {
      notFound: true
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
