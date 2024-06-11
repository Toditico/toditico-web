import NavigationBar from "@/components/layout/NavigationBar";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import MainBrands from "@/components/layout/MainBrands";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import AppDrawer from "./AppDrawer/";
import InventorySelectionDialog from "@/components/layout/InventorySelectionDialog";

export default function Header() {
  const path = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const getH1Content = (path: string) => {
    return path === "/"
      ? "Rueda con confianza"
      : path === "/contact"
      ? "Sobre nosotros, Toditico"
      : "Catálogo de productos";
  };

  const isHomeView = path === "/";
  const isCatalogView = path === "/catalogue" || path.startsWith("/product");
  const isContactView = path === "/contact";
  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [path]);

  return (
    <>
      <AppDrawer isOpen={drawerOpen} closeDrawer={closeDrawer} />
      <InventorySelectionDialog />
      <NavigationBar openMenu={openDrawer} />
      <div
        id="header"
        className={clsx(
          "h-[400px] py-[10px] px-[24px] flex items-center xl:h-[720px]",
          {
            "bg-home md:bg-home-tablet bg-cover": isHomeView,
            "bg-contact bg-center": isContactView,
            "bg-catalog xl:bg-catalog-desktop bg-center": isCatalogView,
          }
        )}
      >
        <div className="mx-auto my-[24px] text-center flex flex-col gap-[24px] items-center xl:max-w-[1000px]">
          <h1 className="font-black text-h1 uppercase text-white md:text-h1-tablet xl:text-h1-desktop">
            {getH1Content(path)}
          </h1>
          {isHomeView && (
            <h3 className="font-medium text-h3 uppercase text-white md:text-h2-tablet xl:text-h2-desktop">
              Servicio superior, precios justos, calidad insuperable y garantía
              que perdura
            </h3>
          )}
          {!isCatalogView && (
            <Button
              className="text-button h-[44px] rounded-lg py-[10px] px-[16px] uppercase font-bold max-w-[300px] md:h-[56px] md:py-[16px]"
              variant="contained"
              startIcon={<IconShoppingBag />}
            >
              Explora nuestro catálogo
            </Button>
          )}
        </div>
      </div>
      <MainBrands />
    </>
  );
}
