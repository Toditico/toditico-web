import { getCommonDataAction } from "@/actions/commonActions";
import BussinessInfo from "@/components/contact/BussinessInfo";
import ContactBottomImage from "@/components/contact/ContactBottomImage";
import StoreCommonData from "@/components/layout/StoreCommonData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | TODITICO",
  description:
    "TODITICO es un proyecto relativamente joven, con el concepto de tienda comercializadora de partes y piezas de la industria automotriz en el mercado cubano",
};

export default async function Contact() {
  const data = await getCommonDataAction();

  return (
    <div className="flex flex-col items-stretch">
      <BussinessInfo />
      <ContactBottomImage />
      <StoreCommonData commonData={data} />
    </div>
  );
}
