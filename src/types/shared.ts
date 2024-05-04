export type Currency = {
  name: string;
  exchangeFactor: number;
  _id: string
};

export type Inventory = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude: number;
  longitude: number;
  isPublic: boolean;
  _id: string
};

export type Workshop = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
  isPublic?: boolean;
};

