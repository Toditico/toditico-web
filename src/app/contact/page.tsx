import { getCommonDataAction } from "@/actions/commonActions";
import BussinessInfo from "@/components/contact/BussinessInfo";
import ContactBottomImage from "@/components/contact/ContactBottomImage";
import StoreCommonData from "@/components/layout/StoreCommonData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | TODITICO",
  description: "...",
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
