export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  short_description: string;
  long_description: string;
  category_name: string;
  category_id: number | null;
  stock: number;
}
