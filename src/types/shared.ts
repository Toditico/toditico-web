export type Currency = {
  name: string;
  exchangeFactor: number;
  _id: string;
};

export type Inventory = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude: number;
  longitude: number;
  _id: string;
};

export type Workshop = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
};

export type ProductStatus = 'AVAILABLE' | 'LOW_STOCK' | 'NOT_AVAILABLE'

export interface Product {
  name: string
  description?: string
  sellPrice: number
  finalPrice: number
  code: string
  imageUrl?: string
  secondaryImagesUrls?: string[]
  discountPercent: number
  status: ProductStatus
  _id: string
}

export type Module = {
  name: string;
  imageUrl?: string;
  _id: string;
};

export type PaginationInfo = {
  maxPage: number;
  count: number;
};
