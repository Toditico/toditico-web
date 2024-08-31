import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Inventory, Workshop } from "@/types/shared";
import {
  Icon,
  latLng,
  Point,
  latLngBounds,
  LatLngExpression,
  Map,
} from "leaflet";
import { useEffect, useMemo, useState } from "react";
import InventoryWorkshopPopup from "./InventoryWorkshopPopup";
import { NoPaddingPopup } from "./styles";
import { useInView } from "react-intersection-observer";
import { useInventoryStore } from "@/stores/inventory";

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

export default function AppMap({ inventories, workshops }: Props) {
  const [map, setMap] = useState<Map | null>(null);
  const [mapAlreadyMoved, setMapAlreadyMoved] = useState(false);
  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );

  const inventoryMarkers = useMemo(() => {
    return inventories
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map((inventory) => (
        <Marker
          key={inventory.name}
          position={latLng(inventory.latitude ?? 0, inventory.longitude ?? 0)}
          icon={inventoryIcon}
          zIndexOffset={1000}
        >
          <NoPaddingPopup>
            <InventoryWorkshopPopup element={inventory} />
          </NoPaddingPopup>
        </Marker>
      ));
  }, [inventories]);

  const workshopMarkers = useMemo(() => {
    return workshops
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map((workshop) => (
        <Marker
          key={workshop.name}
          position={latLng(workshop.latitude ?? 0, workshop.longitude ?? 0)}
          icon={workshopIcon}
        >
          <NoPaddingPopup>
            <InventoryWorkshopPopup element={workshop} />
          </NoPaddingPopup>
        </Marker>
      ));
  }, [workshops]);

  useEffect(() => {
    if (map) {
      const bounds = inventories
        .filter(({ latitude, longitude }) => latitude && longitude)
        .reduce(
          (acc, curr) => {
            return acc.extend([curr.latitude ?? 0, curr.longitude ?? 0]);
          },
          latLngBounds(
            latLng(
              inventories[0]?.latitude ?? 0,
              inventories[0]?.longitude ?? 0,
            ),
            latLng(
              inventories[0]?.latitude ?? 0,
              inventories[0]?.longitude ?? 0,
            ),
          ),
        );
      map.fitBounds(bounds, { padding: new Point(20, 15), maxZoom: 13 });
    }
  }, [map]);

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView.valueOf()) {
        map &&
          !mapAlreadyMoved &&
          selectedInventory &&
          setTimeout(() => {
            map.flyTo(
              {
                lat: selectedInventory.latitude,
                lng: selectedInventory.longitude,
              },
              14,
            );
            setMapAlreadyMoved(true);
          }, 1500);
      }
    },
  });

  return (
    <MapContainer
      ref={setMap}
      className="w-full h-[560px]"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div ref={ref}>
        {inventoryMarkers}
        {workshopMarkers}
      </div>
    </MapContainer>
  );
}
