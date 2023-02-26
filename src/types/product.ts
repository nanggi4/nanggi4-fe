export type Product = {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
}

export type Products = {
  products: Product[];
  totalCount: number;
}