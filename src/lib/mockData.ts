export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export const productsData: Product[] = [
  { id: 1, name: "Wheat", price: 50, stock: 100 },
  { id: 2, name: "Rice", price: 60, stock: 80 },
  { id: 3, name: "Sugar", price: 45, stock: 40 },
];
