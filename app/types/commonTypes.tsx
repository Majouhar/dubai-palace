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
  id: number;
  groupId: number; //suppose a item having 3 size, we use this
  name: string;
  brand: string;
  description: string;
  price: number;
  tags: string[];
  size?: string;
  discount: number;
  inventory: number;
  color: string;
  images: string[];
  date: string;
  features?: string[];
};

export type User = {
  firstName: string;
  lastName: string;
  email?: string;
  mobile: string;
  addressLine1?: string;
  addressLine2?: string;
  pincode: string;
  password: string;
  district?: string;
  cart:Cart;
  orders:Order
};
export type OrderItem = {
  item:Item,
  quantity:number,
  orderPrice:number,
  dateAdded:string
}
export type Cart = {
  cartId:string;
  items:OrderItem[]
}
export type Order = {
  items:OrderItem[];
  orderId:string;
  status:string;
}

export type WishList = {
  items: Item[];
  wishListId :string;
}
