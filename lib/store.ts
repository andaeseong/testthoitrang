import { promises as fs } from "node:fs";
import path from "node:path";

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

interface Store {
  subscribers: Subscriber[];
  orders: Order[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      subscribers: parsed.subscribers ?? [],
      orders: parsed.orders ?? [],
    };
  } catch {
    return { subscribers: [], orders: [] };
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function addSubscriber(email: string): Promise<{
  created: boolean;
  count: number;
}> {
  const store = await readStore();
  const exists = store.subscribers.some((s) => s.email === email);
  if (!exists) {
    store.subscribers.push({ email, createdAt: new Date().toISOString() });
    await writeStore(store);
  }
  return { created: !exists, count: store.subscribers.length };
}

export async function addOrder(order: Order): Promise<Order> {
  const store = await readStore();
  store.orders.push(order);
  await writeStore(store);
  return order;
}

export async function getStats(): Promise<{ subscribers: number; orders: number }> {
  const store = await readStore();
  return { subscribers: store.subscribers.length, orders: store.orders.length };
}
