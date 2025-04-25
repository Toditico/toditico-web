import { useCartStore } from "@/stores/cart";
import { Inventory } from "@/types/shared";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IconInfoCircle } from "@tabler/icons-react";

type Props = {
  onOk?: () => void;
};

export default function CartProductsDialog({ onOk }: Props) {
  const openCartModal = useCartStore((state) => state.openModal);
  const setOpenCartModal = useCartStore((state) => state.setOpenModal);

  return (
    <Dialog open={openCartModal} className="rounded">
      <DialogTitle className="flex items-center justify-between">
        <>
          <p>Cambio de inventario</p>
        </>
      </DialogTitle>
      <DialogContent className="w-full overflow-hidden">
        <div className="flex gap-2">
          <IconInfoCircle className="w-6" />
          <span className="text-small w-[calc(100%-24px)]">
            ¿Desea mover los productos disponibles de su carrito actual al
            nuevo?
          </span>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className="text-button rounded-lg uppercase font-bold"
          variant="contained"
          size="small"
	  onClick={() => {
		  setOpenCartModal(false)
		  onOk?.()
	  }}
        >
          Si
        </Button>
        <Button
          className="text-button rounded-lg uppercase font-bold"
          variant="contained"
          size="small"
	  onClick={() => setOpenCartModal(false)}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
