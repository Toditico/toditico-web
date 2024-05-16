import { Drawer } from "@mui/material";

type Props = {
  isOpen: boolean;
  closeDrawer: () => void;
};
export default function AppDrawer({ isOpen, closeDrawer }: Props) {
  return <Drawer open={isOpen} onClose={() => closeDrawer()}></Drawer>;
}
