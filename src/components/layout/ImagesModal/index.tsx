import { useImagesModalStore } from "@/stores/imagesModal";
import { StyledLightBox } from "./styles";
import NextImageSlide from "./NextImageSlide";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function ImagesModal() {
  const isModalOpen = useImagesModalStore((state) => state.isModalOpen);
  const closeModal = useImagesModalStore((state) => state.closeModal);
  const slides = useImagesModalStore((state) => state.slides);

  return (
    <StyledLightBox
      open={isModalOpen}
      close={closeModal}
      render={{
        slide: NextImageSlide,
        buttonNext: slides.length <= 1 ? () => null : undefined,
        buttonPrev: slides.length <= 1 ? () => null : undefined,
      }}
      slides={slides}
      plugins={[Zoom]}
      zoom={{ maxZoomPixelRatio: 3 }}
    />
  );
}
