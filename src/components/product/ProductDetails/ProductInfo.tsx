import { Currency, Inventory, Module, Product } from "@/types/shared";
import ProductPrice from "./ProductPrice";
import ProductCardStatus from "@/components/catalogue/ProductsContainer/ProductCard/ProductStatus";
import KitProductsInfo from "./KitProductsInfo";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";
import { renderTextWithLinks } from "@/utils/text";
import AtosImage from "@public/images/atos.svg";
import PicantoImage from "@public/images/picanto.svg";
import TicoImage from "@public/images/tico.svg";
import SanderoImage from "@public/images/sandero.svg";
import OthersImage from "@public/images/otros.svg";
import Image, { StaticImageData } from "next/image";
import ProductCardKit from "@/components/catalogue/ProductsContainer/ProductCard/ProductCardKit";
import clsx from "clsx";

type Props = {
  product: Product;
  selectedCurrency: Currency;
  selectedInventory: Inventory;
  selectedModule: Module;
};

export default function ProductInfo({
  product,
  selectedCurrency,
  selectedInventory,
  selectedModule,
}: Props) {
  const { width } = useWindowSize();
  const getTopImage = (moduleName: string): StaticImageData | undefined => {
    if (!moduleName) {
      return undefined;
    }
    if (moduleName.includes("atos")) {
      return AtosImage;
    }
    if (moduleName.includes("picanto")) {
      return PicantoImage;
    }
    if (moduleName.includes("tico")) {
      return TicoImage;
    }
    if (moduleName.includes("sandero")) {
      return SanderoImage;
    }
    if (moduleName.includes("otros")) {
      return OthersImage;
    }
    return undefined;
  };

  const topImage = getTopImage(selectedModule?.name);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {topImage && (
          <Image
            src={topImage}
            alt={selectedModule!.name}
            height={24}
            style={{
              objectFit: "cover",
              filter:
                "invert(68%) sepia(80%) saturate(3500%) hue-rotate(345deg) brightness(90%) contrast(105%)",
            }}
          />
        )}
        <p className="text-h3-desktop font-bold xl:hidden">{product.name}</p>
        {product.description &&
          renderTextWithLinks(
            product.description,
            "text-body max-w-[100%] break-all max-h-[300px] pr-1 overflow-y-auto xl:max-h-[145px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray [&::-webkit-scrollbar-thumb]:rounded-full md:[&::-webkit-scrollbar]:w-2",
          )}
        {width < breakpoints.desktop && (
          <div className="flex gap-3 items-center">
            {!!product?.containedProducts?.length && <ProductCardKit />}
            <ProductCardStatus productStatus={product.status} />
          </div>
        )}
      </div>
      <hr className="text-gray" />
      {product.containedProducts?.length > 0 && (
        <>
          <KitProductsInfo
            product={product}
            selectedCurrency={selectedCurrency}
            selectedInventory={selectedInventory}
            selectedModule={selectedModule}
          />
          <hr className="text-gray" />
        </>
      )}
      <div className="xl:flex xl:justify-between xl:items-center xl:gap-1">
        <ProductPrice
          discount={product.discountPercent}
          originalPrice={product.sellPrice}
          finalPrice={product.finalPrice}
          selectedCurrency={selectedCurrency}
        />
        {width >= breakpoints.desktop && (
          <div
            className={clsx("flex flex-col justify-between items-center", {
              "basis-28": product.status !== "AVAILABLE",
              "flex-shrink-0": product.status !== "AVAILABLE",
            })}
          >
            {product.status !== "AVAILABLE" && (
              <ProductCardStatus productStatus={product.status} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
