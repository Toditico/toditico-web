import { colors } from "@/constants/colors";
import { scrollToElement } from "@/utils/scroll";
import { Button } from "@mui/material";

export default function ScrollToTopButton() {
  const handleClick = () => {
    scrollToElement("modules-selection", "smooth");
  };

  return (
    <Button
      onClick={() => handleClick()}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full z-[1100] bg-primary text-white text-button"
      sx={{
        "&:hover": {
          backgroundColor: colors.primary,
        },
      }}
    >
      Volver a Inicio
    </Button>
  );
}
