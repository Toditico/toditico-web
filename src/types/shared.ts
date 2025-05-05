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
  discountOfferPercentage: number;
};

export type Workshop = {
  name: string;
  phoneNumbers?: string[];
  address?: string;
  latitude: number;
  longitude: number;
  _id: string;
};

export type ProductStatus = "AVAILABLE" | "LOW_STOCK" | "NOT_AVAILABLE";

export type Product = {
  name: string;
  containedProducts: Partial<Product>[];
  description?: string;
  sellPrice: number;
  finalPrice: number;
  count: number;
  code: string;
  imageUrl?: string;
  secondaryImagesUrls?: string[];
  discountPercent: number;
  status: ProductStatus;
  _id: string;
};

export type ProductCount = {
  product: Product;
  count: number;
};

export type Module = {
  name: string;
  imageUrl?: string;
  _id: string;
};

export type PaginationInfo = {
  maxPage: number;
  count: number;
};

export type FilterProductsType = {
  result: Product[];
  paginationInfo: PaginationInfo;
};
