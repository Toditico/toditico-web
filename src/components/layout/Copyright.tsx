import SocialNetworks from "./SocialNetworks";

export default function Copyright() {
  return (
    <div className="bg-primary py-3 px-6 flex flex-col gap-[10px] items-center h-[83px] text-white md:h-[48px] md:flex-row-reverse md:justify-between">
      <SocialNetworks />
      <p className="text-body-bold font-bold">© Copyright TODITICO 2024</p>
    </div>
  );
}
