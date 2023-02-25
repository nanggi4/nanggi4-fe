import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { Product } from '../types/product';

import { convertComma } from '../utilities';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => (
  <Link href={`/products/${id}`}>
    <Container>
      <Image src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} alt={name} width={180} height={180} />
      <Name>{name}</Name>
      <Price>{convertComma(price)}</Price>
    </Container>
  </Link>
);

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Name = styled.h3`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.p`
  margin-top: 4px;
`;
