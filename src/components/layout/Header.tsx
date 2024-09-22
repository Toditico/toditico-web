"use client";
import NavigationBar from "@/components/layout/NavigationBar";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import MainBrands from "@/components/layout/MainBrands";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import AppDrawer from "./AppDrawer/";
import InventorySelectionDialog from "@/components/layout/InventorySelectionDialog";
import CartDrawer from "./CartDrawer";
import Link from "next/link";
import { useCurrencyStore } from "@/stores/currency";
import { useModuleStore } from "@/stores/module";
import { useInventoryStore } from "@/stores/inventory";
import { CommonResponse } from "@/types/home";
import { getCommonDataAction } from "@/actions/commonActions";
import StoreCommonData from "./StoreCommonData";

export default function Header() {
  const path = usePathname();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [buttonHref, setButtonHref] = useState("");
  const [data, setData] = useState<CommonResponse>();

  const isHomeView = path === "/home";
  const isCatalogView = path === "/catalogue" || path.startsWith("/product");
  const isContactView = path === "/contact";

  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const selectedModule = useModuleStore((state) => state.selectedModule);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const modules = useModuleStore((state) => state.modules);
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal,
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCommonDataAction();
        setData(data);
      } catch (error) {
        console.error("Error when receiving commonData: ", data);
      }
    };
    getData();
  }, [path]);

  useEffect(() => {
    if (!selectedInventory && !searchParams.get("inventory")) {
      setOpenSelectionModal(true);
    }
  }, [path]);

  const getH1Content = () => {
    return isHomeView
      ? "Rueda con confianza"
      : isContactView
        ? "Sobre nosotros, Toditico"
        : "Catálogo de productos";
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openCartDrawer = () => {
    setCartDrawerOpen(true);
  };
  const closeCartDrawer = () => {
    setCartDrawerOpen(false);
  };

  useEffect(() => {
    setDrawerOpen(false);
    setCartDrawerOpen(false);
  }, [path]);

  useEffect(() => {
    if (selectedModule && selectedCurrency && selectedInventory) {
      setButtonHref(
        `/catalogue?inventory=${selectedInventory._id}&currency=${selectedCurrency._id}&module=${selectedModule._id}&query=`,
      );
    }
  }, [selectedInventory, selectedCurrency, selectedModule]);

  return (
    <>
      <AppDrawer
        isOpen={drawerOpen}
        closeDrawer={closeDrawer}
        selectedCurrency={selectedCurrency}
        selectedInventory={selectedInventory}
        selectedModule={selectedModule}
        pathName={path}
        modules={modules}
      />
      <CartDrawer
        isOpen={cartDrawerOpen}
        closeDrawer={closeCartDrawer}
        selectedInventory={selectedInventory}
	selectedCurrency={selectedCurrency}
      />
      <InventorySelectionDialog selectedInventory={selectedInventory} />
      <NavigationBar
        openMenu={openDrawer}
        openCart={openCartDrawer}
        selectedInventory={selectedInventory}
      />
      {data && <StoreCommonData commonData={data} />}
      <div
        id="header"
        className={clsx(
          "h-[400px] pb-[10px] mt-[120px] px-[24px] flex items-center xl:h-[720px] xl:mt-20",
          {
            "bg-home md:bg-home-tablet bg-cover": isHomeView,
            "bg-contact bg-center": isContactView,
            "bg-catalog xl:bg-catalog-desktop bg-center": isCatalogView,
          },
        )}
      >
        <div className="mx-auto my-[24px] text-center flex flex-col gap-[24px] items-center xl:max-w-[1000px]">
          <h1 className="font-black text-h1 uppercase text-white md:text-h1-tablet xl:text-h1-desktop">
            {getH1Content()}
          </h1>
          {isHomeView && (
            <h3 className="font-medium text-h3 uppercase text-white md:text-h2-tablet xl:text-h2-desktop">
              Servicio superior, precios justos, calidad insuperable y garantía
              que perdura
            </h3>
          )}
          {!isCatalogView &&
            (selectedInventory && selectedCurrency && selectedModule ? (
              <Link href={buttonHref}>
                <Button
                  className="text-button h-[44px] rounded-lg py-[10px] px-[16px] uppercase font-bold max-w-[300px] md:h-[56px] md:py-[16px]"
                  variant="contained"
                  startIcon={<IconShoppingBag />}
                >
                  Explora nuestro catálogo
                </Button>
              </Link>
            ) : null)}
        </div>
      </div>
      <MainBrands />
    </>
  );
}
