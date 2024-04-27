import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Inventory, Workshop } from "@/types/home";
import { Icon, latLng, Point, latLngBounds } from "leaflet";
import { useMemo } from "react";
import InventoryPopup from "./InventoryPopup";
import { NoPaddingPopup } from "./styles";

type Props = {
  inventories: Inventory[];
  workshops: Workshop[];
};

const inventoryIcon = new Icon({
  iconUrl: "/icons/inventory.svg",
  iconRetinaUrl: "/icons/inventory.svg",
  iconSize: new Point(56, 56),
});

const workshopIcon = new Icon({
  iconUrl: "/icons/workshop.svg",
  iconRetinaUrl: "/icons/workshop.svg",
  iconSize: new Point(56, 56),
});

export default function Map({ inventories, workshops }: Props) {
  const inventoryMarkers = useMemo(() => {
    return inventories
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map((inventory) => (
        <Marker
          key={inventory.name}
          position={latLng(inventory.latitude ?? 0, inventory.longitude ?? 0)}
          icon={inventoryIcon}
        >
          <NoPaddingPopup>
            <InventoryPopup {...{ inventory }} />
          </NoPaddingPopup>
        </Marker>
      ));
  }, inventories);

  const workshopMarkers = useMemo(() => {
    return workshops
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map((workshop) => (
        <Marker
          key={workshop.name}
          position={latLng(workshop.latitude ?? 0, workshop.longitude ?? 0)}
          icon={workshopIcon}
        />
      ));
  }, workshops);

  const bounds = inventories
    .filter(({ latitude, longitude }) => latitude && longitude)
    .reduce((acc, curr) => {
      return acc.extend([curr.latitude ?? 0, curr.longitude ?? 0]);
    }, latLngBounds(latLng(inventories[0]?.latitude ?? 0, inventories[0]?.longitude ?? 0), latLng(inventories[0]?.latitude ?? 0, inventories[0]?.longitude ?? 0)));

  return (
    <MapContainer
      className="w-full h-[560px]"
      zoom={13}
      scrollWheelZoom={false}
      bounds={bounds}
      boundsOptions={{ padding: new Point(20, 15) }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {inventoryMarkers}
      {workshopMarkers}
    </MapContainer>
  );
}
