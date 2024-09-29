import { colors } from "@/constants/colors";
import { Inventory } from "@/types/shared";
import { LaunchWhatsappApp } from "@/utils/whatsapp";
import { Button } from "@mui/material";
import { IconBrandWhatsapp } from "@tabler/icons-react";

type Props = {
  selectedInventory: Inventory | null;
};
export default function WhatsappButton({ selectedInventory }: Props) {
  if (!selectedInventory) {
    return null;
  }

  const handleClick = () => {
    if (selectedInventory.phoneNumbers?.length) {
      const phoneNumber = selectedInventory.phoneNumbers[0];
      const message =
        "Hola, vengo desde el sitio web y me gustaría obtener más información. Podrían ayudarme por favor?";
      LaunchWhatsappApp(phoneNumber, message);
    }
  };

  return (
    <Button
      onClick={() => handleClick()}
      className="w-16 h-16 fixed bottom-4 right-4 rounded-full bg-whatsapp z-[1100]"
      sx={{
        "&:hover": {
          backgroundColor: colors.whatsapp,
        },
      }}
    >
      <IconBrandWhatsapp size={40} color="white" />
    </Button>
  );
}
