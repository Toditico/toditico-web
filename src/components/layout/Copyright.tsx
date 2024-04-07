import instagram from "../../../public/images/instagram.svg";
import linkedin from "../../../public/images/linkedin.svg";
import facebook from "../../../public/images/facebook.svg";
import Image from "next/image";

export default function Copyright() {
  const links = [{ src: facebook }, { src: instagram }, { src: linkedin }];
  return (
    <div className="bg-primary py-3 px-6 flex flex-col gap-[10px] items-center h-[83px] text-white">
      <div className="flex flex-row gap-2">
        {links.map(({ src }) => (
          <Image
            {...{ src }}
            height={24}
            alt="social"
            key={JSON.stringify(src)}
          />
        ))}
      </div>
      <p className="text-body-bold font-bold">© Copyright TODITICO 2024</p>
    </div>
  );
}
