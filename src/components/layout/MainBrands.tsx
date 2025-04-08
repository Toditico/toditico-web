import Image from "next/image";
import atos from "../../../public/images/atos.svg";
import tico from "../../../public/images/tico.svg";
import sandero from "../../../public/images/sandero.svg";
import picanto from "../../../public/images/picanto.svg";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

export default function MainBrands() {
  const [brands, setBrands] = useState([
    { width: 68.53, src: tico },
    { width: 60.21, src: picanto },
    { width: 78.57, src: atos },
    { width: 60.21, src: sandero },
  ]);
  const { width } = useWindowSize();
  useEffect(() => {
    setBrands(
      width < breakpoints.tablet
        ? [
            { width: 68.53, src: tico },
            { width: 80.21, src: picanto },
            { width: 78.57, src: atos },
            { width: 80.21, src: sandero },
          ]
        : width < breakpoints.desktop
        ? [
            { width: 137.05, src: tico },
            { width: 150.42, src: picanto },
            { width: 157.14, src: atos },
            { width: 191.34, src: sandero },
          ]
        : [
            { width: 171.32, src: tico },
            { width: 199.44, src: picanto },
            { width: 161.42, src: atos },
            { width: 220.72, src: sandero },
          ]
    );
  }, [width]);

  return (
    <div className="bg-primary h-20 py-8 px-6 md:p-12 md:h-[128px] xl:h-[160px] xl:px-[10px] xl:py-12">
      <div className="flex flex-row gap-[10px] justify-between text-white xl:max-w-[800px] mx-auto">
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
    </div>
  );
}
