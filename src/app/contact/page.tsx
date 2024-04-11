"use client";
import BussinessInfo from "@/components/contact/BussinessInfo";
import ContactBottomImage from "@/components/contact/ContactBottomImage";

export default function Contact() {
  return (
    <div className="flex flex-col items-stretch pt-12">
      <BussinessInfo />
      <ContactBottomImage />
    </div>
  );
}
