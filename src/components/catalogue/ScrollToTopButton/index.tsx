import { colors } from "@/constants/colors";
import { scrollToElement } from "@/utils/scroll";
import { Button } from "@mui/material";
import { IconArrowUp } from "@tabler/icons-react";

export default function ScrollToTopButton() {
  const handleClick = () => {
    scrollToElement("modules-selection", "smooth");
  };

  return (
    <Button
      onClick={() => handleClick()}
      className="w-16 h-16 fixed bottom-4 left-4 rounded-full z-[1100] bg-primary"
      sx={{
        "&:hover": {
          backgroundColor: colors.primary,
        },
      }}
    >
      <IconArrowUp size={40} color="white" />
    </Button>
  );
}
