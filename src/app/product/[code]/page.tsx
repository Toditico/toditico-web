import { getCommonDataAction } from "@/actions/commonActions";
import { getProductDetailsAction } from "@/actions/productActions";
import StoreCommonData from "@/components/layout/StoreCommonData";
import ProductDetails from "@/components/product/ProductDetails";
import { Metadata } from "next";
import { Suspense } from "react";

type PageProps = {
  params: {
    code: string;
  };
  searchParams: {
    currency: string;
    inventory: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { code } = params;
  const { currency, inventory } = searchParams;

  const product = await getProductDetailsAction(code, inventory, currency)

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.imageUrl || ""],
    },
  };
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { code } = params;
  const { currency, inventory } = searchParams;

  const product = await getProductDetailsAction(code, inventory, currency);

  return (
    <div className="p-6">
      <Suspense>
        <ProductDetails {...{ product }}></ProductDetails>
      </Suspense>
    </div>
  );
}
