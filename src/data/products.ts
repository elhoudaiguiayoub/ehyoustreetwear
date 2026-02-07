import type { Product } from "../types/product";

import tee from "../assets/products/tee-01.png";
import hood from "../assets/products/hood-01.png";
import cap from "../assets/products/cap-01.png";

export const products: (Product & { image: string })[] = [
  {
    id: "tee-01",
    name: "EHYoub Logo Tee",
    price: 45,
    category: "T-Shirts",
    image: tee,
  },
  {
    id: "hood-01",
    name: "EHYoub Classic Hoodie",
    price: 85,
    category: "Hoodies",
    image: hood,
  },
  {
    id: "cap-01",
    name: "EHYoub Signature Cap",
    price: 35,
    category: "Accessories",
    image: cap,
  },
];
