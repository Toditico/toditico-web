import { breakpoints } from "@/constants/breakpoints";

export const scrollToElement = (
  elementId: string,
  width: number,
  behavior: ScrollBehavior = "instant",
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element to scroll not found");
    return;
  }

  const offsetAdjustment = width < breakpoints.tablet ? 120 : 0

  const offsetTop = element.offsetTop - offsetAdjustment; //Adjust in case of tablet and desktop
  window.scrollTo({
    top: offsetTop,
    behavior,
  });
};
