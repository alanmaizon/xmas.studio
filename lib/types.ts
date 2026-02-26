export type Product = {
  slug: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  giftFor: string[];
  colors: string[];
  sizes: string[];
  deliveryDays: number;
  badges: string[];
  image: string;
};

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};
