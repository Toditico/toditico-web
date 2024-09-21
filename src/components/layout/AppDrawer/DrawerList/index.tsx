import { DrawerListItem as ListItemType } from "./DrawerListItem";
import DrawerListItem from "./DrawerListItem";

type Props = {
  items: ListItemType[];
};

export default function DrawerList({ items }: Props) {
  return (
    <div className="flex flex-col gap-[10px]">
      {items.map(({ label, link, subItems, isSelected }) => (
        <DrawerListItem {...{ label, link, subItems, isSelected }} key={link} />
      ))}
    </div>
  );
}
