import { SlideImage } from "yet-another-react-lightbox";
import { create } from "zustand";

type ImagesModalState = {
  slides: SlideImage[];
  setSlides: (slides: SlideImage[]) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  index: number;
  setIndex: (index: number) => void;
};

export const useImagesModalStore = create<ImagesModalState>((set) => ({
  slides: [],
  index: 0,
  setIndex: (index: number) =>
    set(() => {
      return {
        index,
      };
    }),
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
      return { isModalOpen: false, index: 0 };
    });
  },
}));
