export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export type CartItem = Product & {
  qty: number;
};
