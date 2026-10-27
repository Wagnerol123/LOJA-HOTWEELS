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

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "pendente" | "concluido";
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  logo?: string;
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  categoriesTitle: string;
  featuredTitle: string;
  footerDisclaimer: string;
  footerCopyright: string;
}
