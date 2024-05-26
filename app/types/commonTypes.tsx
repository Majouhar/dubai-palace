export type Option =
  | {
      name: string;
      value?: string;
      url: string;
    }
  | {
      name: string;
      value: string;
      url?: string;
    };

export type LocalDictPromise = {
  [key: string]: () => Promise<LocalDict>;
};

export type LocalDict = { [key: string]: string };

export type Item = {
  id: string;
  group_id: number; //suppose a item having 3 size, we use this
  name: string;
  brand: string;
  description: string;
  price: number;
  tags: string[];
  size: string | null;
  discount: number;
  inventory: number;
  color: string;
  images: string[];
  date: string;
  features: string[] | null;
  order_multiple: number | null;
  order_quantity: number | null;
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email?: string;
  mobile: string;
  addressLine1: string | null;
  addressLine2: string | null;
  pincode: string;
  password: string;
  district: string | null;
  cartId: number;
  orders: number[];
  wishListId: number;
  is_admin: boolean;
};
export type OrderItem = {
  item_id: string;
  quantity: number;
  date_added: string;
  date_delivered?: string;
  price_while_order?: number;
};
export type Cart = {
  cartId: number;
  items: OrderItem[];
};
export type Order = {
  items: OrderItem[];
  order_id: number;
  status: string;
  date_ordered: string;
  price: number;
};

export type WishList = {
  itemIDs: string[];
  wishListId: number;
};
