import instagram from "../../../public/images/instagram.svg";
import linkedin from "../../../public/images/linkedin.svg";
import facebook from "../../../public/images/facebook.svg";
import youtube from "../../../public/images/youtube.svg";
import instagramAlt from "../../../public/images/instagram-alt.svg";
import linkedinAlt from "../../../public/images/linkedin-alt.svg";
import facebookAlt from "../../../public/images/facebook-alt.svg";
import youtubeAlt from "../../../public/images/youtube-alt.svg";
import Image from "next/image";

type Props = {
  isAlternative?: boolean;
};

export default function SocialNetworks({ isAlternative = false }: Props) {
  const facebookLink = "https://www.facebook.com/share/15hopRCBA3/";
  const instagramLink =
    "https://www.instagram.com/toditico_cuba?igsh=MWxzNHJpZHBycjB6Nw==";
  const linkedinLink = "https://www.linkedin.com/company/toditico/";
  const youtubeLink = "https://youtube.com/@toditico_cuba?feature=shared";

  const links = isAlternative
    ? [
        { src: facebookAlt, link: facebookLink },
        { src: instagramAlt, link: instagramLink },
        { src: linkedinAlt, link: linkedinLink },
        {
          src: youtubeAlt,
          link: youtubeLink,
        },
      ]
    : [
        { src: facebook, link: facebookLink },
        { src: instagram, link: instagramLink },
        { src: linkedin, link: linkedinLink },
        { src: youtube, link: youtubeLink },
      ];

  return (
    <>
      <div className="flex flex-row gap-2">
        {links.map(({ src, link }) => (
          <a href={link} key={link} target="_blank">
            <Image {...{ src }} height={24} alt="social" />
          </a>
        ))}
      </div>
    </>
  );
}
