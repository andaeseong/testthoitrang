export interface Subscriber {
  email: string;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

const globalForStore = globalThis as unknown as {
  __subscribers?: Subscriber[];
  __orders?: Order[];
};

export const subscribers: Subscriber[] =
  globalForStore.__subscribers ?? (globalForStore.__subscribers = []);

export const orders: Order[] =
  globalForStore.__orders ?? (globalForStore.__orders = []);
