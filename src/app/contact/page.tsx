import BussinessInfo from "@/components/contact/BussinessInfo";
import ContactBottomImage from "@/components/contact/ContactBottomImage";
import { Metadata } from "next";
import ogImage from "@public/opengraph-image.jpg";

export const metadata: Metadata = {
  title: "Nosotros | TODITICO",
  description:
    "TODITICO es un proyecto relativamente joven, con el concepto de tienda comercializadora de partes y piezas de la industria automotriz en el mercado cubano",
  metadataBase: new URL("https://toditico-web-eight.vercel.app/"),
  openGraph: {
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
    },
  },
  twitter: {
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
    },
  },
};

export default async function Contact() {
  return (
    <div className="flex flex-col items-stretch">
      <BussinessInfo />
      <ContactBottomImage />
    </div>
  );
}
