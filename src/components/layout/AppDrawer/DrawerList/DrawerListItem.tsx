import { AccordionDetails } from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { AccordionStyled, AccordionSummaryStyled } from "./styles";
import clsx from "clsx";

export type DrawerListItem = {
  label: string;
  link: string;
  subItems?: DrawerListItem[];
  isSelected: boolean;
  isDesktop?: boolean;
  itemClicked?: () => void;
};

export default function DrawerListItem({
  subItems = [],
  label,
  link,
  isSelected,
  isDesktop = false,
  itemClicked,
}: DrawerListItem) {
  if (subItems?.length === 0) {
    return (
      <Link
        className={clsx("font-bold text-button uppercase px-6 py2", {
          "text-primary": isSelected,
          "underline underline-offset-4 decoration-2": isSelected && isDesktop,
        })}
        href={link}
        scroll={!isDesktop}
        onClick={() => itemClicked?.()}
      >
        <p>{label}</p>
      </Link>
    );
  }

  return (
    <AccordionStyled variant="outlined">
      <AccordionSummaryStyled
        expandIcon={
          <IconChevronDown
            className={clsx("", { "text-primary": isSelected })}
          />
        }
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <p
          className={clsx("font-bold text-button uppercase px-2 py2", {
            "text-primary": isSelected,
          })}
        >
          {label}
        </p>
      </AccordionSummaryStyled>
      <AccordionDetails>
        <div className="flex flex-col gap-2 pl-4 uppercase">
          {subItems.map((listSubitem) => (
            <Link
              key={listSubitem.link}
              className={clsx("text-small", {
                "font-bold": listSubitem.isSelected,
              })}
              href={listSubitem.link}
              scroll={!isDesktop}
              onClick={() => itemClicked?.()}
            >
              {listSubitem.label}
            </Link>
          ))}
        </div>
      </AccordionDetails>
    </AccordionStyled>
  );
}
