export const revalidate = 300
import { getCommonDataAction } from "@/actions/commonActions";
import { filterProductsAction } from "@/actions/productActions";
import CatalogueClientWrapper from "@/components/catalogue/CatalogueClientWrapper";
import StoreCommonData from "@/components/layout/StoreCommonData";
import { Metadata } from "next";
import ogImage from "@public/opengraph-image.jpg";
import { FilterProductsType } from "@/types/shared";
import { CommonResponse } from "@/types/home";

type PageProps = {
  searchParams: {
    currency: string;
    inventory: string;
    module: string;
    query: string;
    page: number;
  };
};

export const metadata: Metadata = {
  title: "Catálogo | TODITICO",
  description:
    "TODITICO es un proyecto relativamente joven, con el concepto de tienda comercializadora de partes y piezas de la industria automotriz en el mercado cubano",
  metadataBase: new URL("https://toditico-web-eight.vercel.app/"),
  openGraph: {
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
    },
  },
  twitter: {
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
    },
  },
};

export default async function Catalogue({ searchParams }: PageProps) {
  const { currency, inventory, module, query, page } = searchParams;

  const promises = [
    getCommonDataAction(),
    filterProductsAction(
      query || "",
      inventory,
      currency,
      module,
      page ?? 1,
      10,
    ),
  ];

  const [data, filterProducts] = await Promise.all(promises);
  const { result: products, paginationInfo } =
    filterProducts as FilterProductsType;

  return (
    <>
      <div className="flex flex-col gap-[10px] pt-6 px-[10x] pb-0">
        <>
          <StoreCommonData commonData={data as CommonResponse} />
          <CatalogueClientWrapper
            lastFetchedProducts={products}
            maxPage={paginationInfo.maxPage}
            data={data as CommonResponse}
          />
        </>
      </div>
    </>
  );
}
