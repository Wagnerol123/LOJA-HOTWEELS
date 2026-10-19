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

export interface SiteSettings {
  siteName: string;
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
