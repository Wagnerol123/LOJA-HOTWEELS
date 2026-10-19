export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  scale: string;
  color: string;
  accent: string;
  image?: string;
  price: number;
  oldPrice?: number;
  stock: number;
  rarity?: string;
  description: string;
  details: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}
