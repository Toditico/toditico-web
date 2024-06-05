import Link from "next/link";

export type DrawerListItem = {
  label: string;
  link: string;
  subItems?: DrawerListItem[];
};

export default function DrawerListItem({
  subItems,
  label,
  link,
}: DrawerListItem) {
  return (
    <Link className="font-bold text-button uppercase px-6 py2" href={link}>
      <p>{label}</p>
    </Link>
  );
}
