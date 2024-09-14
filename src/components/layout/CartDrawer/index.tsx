import { Button, Drawer } from "@mui/material";
import CartProductList from "./CartProductsList";
import { useCartStore } from "@/stores/cart";
import { IconBrandWhatsapp, IconX } from "@tabler/icons-react";
import { Inventory } from "@/types/shared";

type Props = {
  isOpen: boolean;
  closeDrawer: () => void;
  selectedInventory: Inventory | null;
};

export default function CartDrawer({
  isOpen,
  closeDrawer,
  selectedInventory,
}: Props) {
  const products = useCartStore((state) =>
    selectedInventory
      ? state.getCartInventoryProducts(selectedInventory._id)
      : [],
  );

  return (
    <Drawer open={isOpen} onClose={() => closeDrawer()} anchor="right">
      <div className="w-[100vw] min-w-[400px] py-4 px-6 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-body font-bold uppercase">
              {products.length} Artículos
            </p>
            <IconX onClick={() => closeDrawer()} />
          </div>
          <CartProductList {...{ products }} />
        </div>
        <Button
          variant="contained"
          color="success"
          className="h-[56px] w-full rounded-lg p-4 text-white"
          startIcon={<IconBrandWhatsapp size={24} />}
        >
          <p className="text-button uppercase font-bold">
            Contactar al servicio
          </p>
        </Button>
      </div>
    </Drawer>
  );
}
