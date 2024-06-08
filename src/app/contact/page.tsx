"use client";
import BussinessInfo from "@/components/contact/BussinessInfo";
import ContactBottomImage from "@/components/contact/ContactBottomImage";
import { useCommonData } from "@/hooks/useCommonData";

export default function Contact() {
  useCommonData();

  return (
    <div className="flex flex-col items-stretch">
      <BussinessInfo />
      <ContactBottomImage />
    </div>
  );
}
