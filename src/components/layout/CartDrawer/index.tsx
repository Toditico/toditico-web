"use client";
import { Button, Drawer } from "@mui/material";
import CartProductList from "./CartProductsList";
import { useCartStore } from "@/stores/cart";
import { IconBrandWhatsapp, IconX, IconTrash } from "@tabler/icons-react";
import { Currency, Inventory } from "@/types/shared";
import { useEffect, useState } from "react";
import { refreshCartProductsAction } from "@/actions/cartActions";
import { twoFixedPlacesIfFloat } from "@/utils/numbers";
import {
  LaunchWhatsappApp,
  whatsappGreetingMessage,
  whatsappProductsGreeetingMessage,
} from "@/utils/whatsapp";

type Props = {
  isOpen: boolean;
  closeDrawer: () => void;
  selectedInventory: Inventory | null;
  selectedCurrency: Currency | null;
};

export default function CartDrawer({
  isOpen,
  closeDrawer,
  selectedInventory,
  selectedCurrency,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const products = useCartStore((state) =>
    selectedInventory
      ? state.getCartInventoryProducts(selectedInventory._id)
      : [],
  );
  const totalProducts = useCartStore((state) =>
    selectedInventory ? state.totalProducts(selectedInventory._id) : 0,
  );
  const subTotal = useCartStore((state) =>
    selectedInventory ? state.subTotal(selectedInventory._id) : 0,
  );

  const cleanInventoryProducts = useCartStore(
    (state) => state.cleanInventoryProducts,
  );

  const refreshCartInventoryProducts = useCartStore(
    (state) => state.refreshCartInventoryProducts,
  );

  useEffect(() => {
    const refreshCartProducts = async () => {
      if (
        isOpen &&
        selectedInventory &&
        selectedCurrency &&
        products.length > 0
      ) {
        setIsLoading(true);
        try {
          const refreshedProducts = await refreshCartProductsAction(
            products.map((productCount) => productCount.product.code),
            selectedInventory._id,
            selectedCurrency._id,
          );
          refreshCartInventoryProducts(
            selectedInventory._id,
            refreshedProducts,
          );
        } catch (error) {
          console.log("There was an error when refreshing products: ", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    refreshCartProducts();
  }, [isOpen]);

  const sendProductsDataToWhatsapp = () => {
    if (isLoading) {
      return;
    }

    if (selectedInventory?.phoneNumbers?.length) {
      const phoneNumber = selectedInventory?.phoneNumbers[0];

      if (products.length === 0) {
        LaunchWhatsappApp(phoneNumber, whatsappGreetingMessage);
        return;
      }

      const productMessages = products.map(
        (prodCount) =>
          `${prodCount.count} ${prodCount.product.name} - ${twoFixedPlacesIfFloat(prodCount.count * prodCount.product.finalPrice)} ${selectedCurrency?.name}`,
      );

      const subTotalMessage = `\nTotal: ${twoFixedPlacesIfFloat(subTotal)} ${selectedCurrency?.name}`;

      const messages = [
        whatsappProductsGreeetingMessage,
        ...productMessages,
        subTotalMessage,
      ];

      LaunchWhatsappApp(phoneNumber, messages.join("\n"));
    }
  };

  return (
    <Drawer open={isOpen} onClose={() => closeDrawer()} anchor="right">
      <div className="w-[100vw] min-w-[320px] py-4 px-6 flex flex-col justify-between h-full md:w-[500px]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-body font-bold uppercase">
              {totalProducts} {totalProducts === 1 ? "Artículo" : "Artículos"}
            </p>
            <div className="flex gap-2">
              <IconTrash
                className="cursor-pointer"
                onClick={() =>
                  selectedInventory &&
                  cleanInventoryProducts(selectedInventory._id)
                }
              />
              <IconX className="cursor-pointer" onClick={() => closeDrawer()} />
            </div>
          </div>
          <CartProductList {...{ products, isLoading, closeDrawer }} />
        </div>
        <Button
          variant="contained"
          color="success"
          className="h-[56px] w-full rounded-lg p-4 text-white"
          startIcon={<IconBrandWhatsapp size={24} />}
          onClick={sendProductsDataToWhatsapp}
        >
          <p className="text-button uppercase font-bold">
            Contactar al servicio
          </p>
        </Button>
      </div>
    </Drawer>
  );
}
