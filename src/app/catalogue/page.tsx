import { getCommonDataAction } from "@/actions/commonActions";
import { filterProductsAction } from "@/actions/productActions";
import CatalogueClientWrapper from "@/components/catalogue/CatalogueClientWrapper";
import StoreCommonData from "@/components/layout/StoreCommonData";

type PageProps = {
  searchParams: {
    currency: string;
    inventory: string;
    module: string;
    query: string;
    page: number;
  };
};

export default async function Catalogue({ searchParams }: PageProps) {
  const { currency, inventory, module, query, page } = searchParams;
  const data = await getCommonDataAction();

  const { result: products, paginationInfo } = await filterProductsAction(
    query || "",
    inventory,
    currency,
    module,
    page ?? 1,
    10,
  );

  return (
    <>
      <div className="flex flex-col gap-[10px] pt-6 px-[10x] pb-0">
        <>
          <StoreCommonData commonData={data} />
          <CatalogueClientWrapper
            lastFetchedProducts={products}
            maxPage={paginationInfo.maxPage}
            data={data}
          />
        </>
      </div>
    </>
  );
}
