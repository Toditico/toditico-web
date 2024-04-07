import Image from "next/image";
import atos from "../../../public/images/atos.svg";
import tico from "../../../public/images/tico.svg";
import i10 from "../../../public/images/i10.svg";
import picanto from "../../../public/images/picanto.svg";

export default function MainBrands() {
  const brands = [
    { width: 68.53, src: tico },
    { width: 60.21, src: picanto },
    { width: 78.57, src: atos },
    { width: 60.21, src: i10 },
  ];
  return (
    <>
      <div className="flex flex-row bg-primary h-20 py-8 px-6 gap-[10px] justify-between text-white">
        {brands.map(({ width, src }) => (
          <Image
            {...{ width, src }}
            alt="Toditico"
            height={16}
            priority
            key={JSON.stringify(src)}
          />
        ))}
      </div>
    </>
  );
}
