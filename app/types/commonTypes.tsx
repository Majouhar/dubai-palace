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
  images:string[];
  date:string;
};
