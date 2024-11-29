import { DrawerListItem as ListItemType } from "./DrawerListItem";
import DrawerListItem from "./DrawerListItem";

type Props = {
  items: ListItemType[];
  itemClicked: () => void;
};

export default function DrawerList({ items, itemClicked }: Props) {
  return (
    <div className="flex flex-col gap-[10px]">
      {items.map(({ label, link, subItems, isSelected }) => (
        <DrawerListItem {...{ label, link, subItems, isSelected, itemClicked }} key={link} />
      ))}
    </div>
  );
}
