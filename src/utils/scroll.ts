export const scrollToElement = (
  elementId: string,
  behavior: ScrollBehavior = "instant",
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element to scroll not found");
    return;
  }

  const offsetTop = element.offsetTop - 120; //Adjust in case of tablet and desktop
  window.scrollTo({
    top: offsetTop,
    behavior,
  });
};
