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
  _id: string
};

export type Workshop = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
};

export type Product = {
  name: string
  description?: string
  sellPrice: number
  count: number
  // modules: PopulatedDoc<Brand & Module>[]
  code: string
  imageUrl?: string
  secondaryImagesUrls?: string[]
  _id: string
}
