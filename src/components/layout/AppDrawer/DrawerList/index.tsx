import DrawerListItem, {
  DrawerListItem as ListItemType,
} from "./DrawerListItem";

type Props = {
  items: ListItemType[];
};

export default function DrawerList({ items }: Props) {
  return (
    <div className="flex flex-col gap-[10px]">
      {items.map(({ label, link, subItems }) => (
        <DrawerListItem {...{ label, link, subItems }} key={link} />
      ))}
    </div>
  );
}
