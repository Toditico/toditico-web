export type Stats = {
  customers: number;
  sales: number;
  products: number;
};

export type Inventory = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude: number;
  longitude: number;
  isPublic: boolean;
};

export type Workshop = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
  isPublic?: boolean;
};

export type HomeResponse = {
  stats: Stats;
  inventories: Inventory[];
  workshops: Workshop[];
};
