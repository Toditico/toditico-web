import { useImagesModalStore } from "@/stores/imagesModal";
import { StyledLightBox } from "./styles";
import NextImageSlide from "./NextImageSlide";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function ImagesModal() {
  const isModalOpen = useImagesModalStore((state) => state.isModalOpen);
  const closeModal = useImagesModalStore((state) => state.closeModal);
  const slides = useImagesModalStore((state) => state.slides);
  const index = useImagesModalStore((state) => state.index);
  const setIndex = useImagesModalStore((state) => state.setIndex);

  return (
    <StyledLightBox
      open={isModalOpen}
      close={closeModal}
      index={index}
      render={{
        slide: NextImageSlide,
        buttonNext: slides.length <= 1 ? () => null : undefined,
        buttonPrev: slides.length <= 1 ? () => null : undefined,
      }}
      on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
      slides={slides}
      plugins={[Zoom]}
      zoom={{ maxZoomPixelRatio: 3 }}
    />
  );
}
