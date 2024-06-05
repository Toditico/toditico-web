import instagram from "../../../public/images/instagram.svg";
import linkedin from "../../../public/images/linkedin.svg";
import facebook from "../../../public/images/facebook.svg";
import instagramAlt from "../../../public/images/instagram-alt.svg";
import linkedinAlt from "../../../public/images/linkedin-alt.svg";
import facebookAlt from "../../../public/images/facebook-alt.svg";
import Image from "next/image";

type Props = {
  isAlternative?: boolean;
};

export default function SocialNetworks({ isAlternative = false }: Props) {
  const links = isAlternative
    ? [{ src: facebookAlt }, { src: instagramAlt }, { src: linkedinAlt }]
    : [{ src: facebook }, { src: instagram }, { src: linkedin }];

  return (
    <>
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
    </>
  );
}
