import { SlideImage } from "yet-another-react-lightbox";
import { create } from "zustand";

type ImagesModalState = {
  slides: SlideImage[];
  setSlides: (slides: SlideImage[]) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useImagesModalStore = create<ImagesModalState>((set) => ({
  slides: [],
  isModalOpen: false,
  openModal: () =>
    set(() => {
      return { isModalOpen: true };
    }),
  setSlides: (slides) =>
    set(() => {
      return { slides };
    }),
  closeModal() {
    set(() => {
      return { isModalOpen: false };
    });
  },
}));
