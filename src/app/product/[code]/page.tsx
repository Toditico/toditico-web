import { getProductsDetailsAction } from "@/actions/productActions";
import ProductDetails from "@/components/product/ProductDetails";
import { Metadata } from "next";

type PageProps = {
  params: {
    code: string;
  };
  searchParams: {
    currency: string;
    inventory: string;
    module: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { code } = params;
  const { currency, inventory } = searchParams;

  const products = await getProductsDetailsAction([code], inventory, currency);
  const product = products[0];

  return product
    ? {
        title: product.name,
        description: product.description,
        openGraph: {
          images: [product.imageUrl || ""],
        },
      }
    : {};
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { code } = params;
  const { currency, inventory, module } = searchParams;

  const products = await getProductsDetailsAction([code], inventory, currency);
  const product = products.length ? products[0] : null;

  return (
    <div className="p-6">
      <ProductDetails {...{ product }}></ProductDetails>
    </div>
  );
}
