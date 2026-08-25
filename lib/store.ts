import { promises as fs } from "node:fs";
import os from "node:os";
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

// On serverless platforms (Vercel) the working directory is read-only,
// so we fall back to the writable temp dir. Locally we use ./data.
const isServerless =
  process.env.VERCEL === "1" || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isServerless
  ? path.join(os.tmpdir(), "noir-form-data")
  : path.join(process.cwd(), "data");
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
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Persistence is best-effort (e.g. read-only FS on some hosts).
    // The API still returns success; data may not survive on serverless.
  }
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
