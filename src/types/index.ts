export type User = {
  email: string;
  role: "manager" | "store_keeper";
};

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};