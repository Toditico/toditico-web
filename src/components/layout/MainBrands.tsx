import Image from "next/image";
import atos from "../../../public/images/atos.svg";
import tico from "../../../public/images/tico.svg";
import i10 from "../../../public/images/i10.svg";
import picanto from "../../../public/images/picanto.svg";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

export default function MainBrands() {
  const [brands, setBrands] = useState([
    { width: 68.53, src: tico },
    { width: 60.21, src: picanto },
    { width: 78.57, src: atos },
    { width: 60.21, src: i10 },
  ]);
  const { width } = useWindowSize();
  useEffect(() => {
    setBrands(
      width < breakpoints.tablet
        ? [
            { width: 68.53, src: tico },
            { width: 60.21, src: picanto },
            { width: 78.57, src: atos },
            { width: 60.21, src: i10 },
          ]
        : width < breakpoints.desktop
        ? [
            { width: 137.05, src: tico },
            { width: 120.42, src: picanto },
            { width: 157.14, src: atos },
            { width: 71.34, src: i10 },
          ]
        : [
            { width: 171.32, src: tico },
            { width: 199.44, src: picanto },
            { width: 161.42, src: atos },
            { width: 84.72, src: i10 },
          ]
    );
  }, [width]);

  return (
    <>
      <div className="flex flex-row bg-primary h-20 py-8 px-6 gap-[10px] justify-between text-white md:p-12 md:h-[128px]">
        {brands.map(({ width, src }) => (
          <Image
            {...{ width, src }}
            alt="Toditico"
            height={
              width < breakpoints.tablet
                ? 16
                : width < breakpoints.desktop
                ? 32
                : 53
            }
            priority
            key={JSON.stringify(src)}
          />
        ))}
      </div>
    </>
  );
}
