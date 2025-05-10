"use client";
import NavigationBar from "@/components/layout/NavigationBar";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import MainBrands from "@/components/layout/MainBrands";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
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
import ImagesModal from "./ImagesModal";
import WhatsappButton from "./WhatsappButton";
import { DrawerListItem } from "./AppDrawer/DrawerList/DrawerListItem";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";
import { localStorageIDs } from "@/constants/localStorage";
import CartProductsDialog from "./CartProductDialog";
import { useCartStore } from "@/stores/cart";
import Image from "next/image";

export default function Header() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [buttonHref, setButtonHref] = useState("");
  const [data, setData] = useState<CommonResponse>();

  const isHomeView = path === "/home";
  const isCatalogView = path === "/catalogue" || path.startsWith("/product");
  const isContactView = path === "/contact";

  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const selectedModule = useModuleStore((state) => state.selectedModule);
  const previousSelectedInventory = useInventoryStore(
    (state) => state.previousSelectedInventory,
  );
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const cartProducts = useCartStore((state) => state.products);
  const setOpenCartModal = useCartStore((state) => state.setOpenModal);
  const moveProductsBetweenInventories = useCartStore(
    (state) => state.moveBetweenInventories,
  );

  const modules = useModuleStore((state) => state.modules);
  const setOpenSelectionModal = useInventoryStore(
    (state) => state.setOpenSelectionModal,
  );

  const handlePopState = useCallback(function () {
    setOpenSelectionModal(false);
    setOpenCartModal(false);
    localStorage.setItem(localStorageIDs.backNavigation, "true");
  }, []);

  typeof window !== "undefined" &&
    window.addEventListener("popstate", handlePopState);

  const navigationItems: DrawerListItem[] = [
    { label: "Inicio", link: "/home", isSelected: path === "/home" },
    {
      label: "Catálogo",
      isSelected: path === "/catalogue",
      subItems: modules
        .sort((prevModule, actualModule) => {
          if (prevModule.name < actualModule.name) return -1;
          return 1;
        })
        .map((module) => {
          const subItem: DrawerListItem = {
            label: module.name,
            isSelected: module._id === selectedModule?._id,
            link: `/catalogue?inventory=${selectedInventory?._id}&currency=${selectedCurrency?._id}&module=${module._id}&query=`,
          };
          return subItem;
        }),
      link: `/catalogue?inventory=${selectedInventory?._id}&currency=${selectedCurrency?._id}&module=${selectedModule?._id}&query=`,
    },
    {
      label: "Nosotros",
      link: "/contact",
      isSelected: path === "/contact",
    },
  ];

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

  useEffect(() => {
    if (!previousSelectedInventory || !selectedInventory) {
      return;
    }

    const previousInventoryProducts =
      cartProducts.get(previousSelectedInventory._id) ?? [];
    const selectedInventoryProducts =
      cartProducts.get(selectedInventory._id) ?? [];

    if (
      previousInventoryProducts?.length > 0 &&
      selectedInventoryProducts.length === 0
    ) {
      setOpenCartModal(true);
    }
  }, [selectedInventory]);

  useEffect(() => {
    if (localStorage.getItem(localStorageIDs.backNavigation) !== "true") {
      // INFO: If navigation was not using back button and is not catalogue view, go to the top
      if (isHomeView || isContactView) {
        window.scrollTo({ top: 0 });
      }
    }
    setTimeout(() => {
      localStorage.removeItem(localStorageIDs.backNavigation);
    }, 1000);
  }, [path]);

  const globalOfferComponent = () => {
    return (
      <div className="flex-col">
        <div className="bg-primary text-white py-2 px-4 md:py-4 md:px-6">
          Estamos de oferta
        </div>
        <div className="bg-white text-primary py-2 px-4 md:py-4 md:px-6">
          Obtén un {selectedInventory?.discountOfferPercentage}% de descuento
        </div>
      </div>
    );
  };

  const getH1Content = () => {
    return isHomeView
      ? "Rueda con confianza"
      : isContactView
        ? "Sobre nosotros, Toditico"
        : selectedInventory?.discountOfferPercentage === 0
          ? "Catálogo de productos"
          : globalOfferComponent();
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

  const offerImagesSize =
    width < breakpoints.tablet
      ? 90
      : width < breakpoints.desktop
        ? 140
        : width < breakpoints.xldesktop
          ? 220
          : 340;

  return (
    <>
      <AppDrawer
        isOpen={drawerOpen}
        closeDrawer={closeDrawer}
        navigationItems={navigationItems}
      />
      <CartDrawer
        isOpen={cartDrawerOpen}
        closeDrawer={closeCartDrawer}
        selectedInventory={selectedInventory}
        selectedCurrency={selectedCurrency}
      />
      <InventorySelectionDialog selectedInventory={selectedInventory} />
      <CartProductsDialog
        onOk={() =>
          moveProductsBetweenInventories(
            previousSelectedInventory!._id,
            selectedInventory!._id,
          )
        }
      />
      <NavigationBar
        isLoading={modules.length === 0}
        openMenu={openDrawer}
        openCart={openCartDrawer}
        selectedInventory={selectedInventory}
        navigationItems={width >= breakpoints.desktop ? navigationItems : []}
      />
      <ImagesModal />
      {data && (
        <>
          <WhatsappButton selectedInventory={selectedInventory} />
          <StoreCommonData commonData={data} />
        </>
      )}
      <div
        id="header"
        className={clsx(
          "h-[400px] pb-[10px] mt-[120px] px-[24px] flex items-center xl:h-[720px] xl:mt-20 xl:max-h-[100vh] relative",
          {
            "bg-home md:bg-home-tablet bg-cover": isHomeView,
            "bg-contact bg-center": isContactView,
            "bg-catalog xl:bg-catalog-desktop bg-center": isCatalogView,
          },
        )}
      >
        {selectedInventory!.discountOfferPercentage > 0 && isCatalogView && (
          <>
            <Image
              alt="offerimg"
              src="/images/offerup.svg"
              width={offerImagesSize}
              height={offerImagesSize}
              className="absolute top-0 right-0"
            />
            <Image
              alt="offerimg"
              src="/images/offerdown.svg"
              width={offerImagesSize}
              height={offerImagesSize}
              className="absolute bottom-0 left-0"
            />
          </>
        )}
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
