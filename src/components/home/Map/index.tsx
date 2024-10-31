"use client";

import Map, { Marker, Popup } from "react-map-gl/maplibre";
import { useEffect, useMemo, useRef, useState } from "react";
import { Inventory, Workshop } from "@/types/shared";
import type { MapRef } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import WorkshopIcon from "@public/icons/workshop.svg";
import InventoryIcon from "@public/icons/inventory.svg";
import Image from "next/image";
import InventoryWorkshopPopup from "./InventoryWorkshopPopup";
import { useInView } from "react-intersection-observer";
import { useInventoryStore } from "@/stores/inventory";

type Props = {
  inventories: Inventory[];
  workshops: Workshop[];
};

type PopupData = {
  element: Inventory | Workshop;
  type: "Inventory" | "Workshop";
};

export default function AppMap({ workshops, inventories }: Props) {
  const mapRef = useRef<MapRef>(null);
  const [popupData, setPopupData] = useState<PopupData | undefined>(undefined);

  const selectedInventory = useInventoryStore(
    (state) => state.selectedInventory,
  );
  const [mapAlreadyMoved, setMapAlreadyMoved] = useState(false);

  const inventoryMarkers = useMemo(() => {
    return inventories
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map((inventory) => (
        <Marker
          className="z-50"
          key={inventory.name}
          latitude={inventory.latitude}
          longitude={inventory.longitude}
          onClick={() =>
            setTimeout(() => {
              setPopupData({ element: inventory, type: "Inventory" });
            }, 100)
          }
        >
          <Image src={InventoryIcon} alt="" />
        </Marker>
      ));
  }, [inventories]);

  const workshopMarkers = useMemo(() => {
    return workshops
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map((workshop) => (
        <Marker
          className="z-40"
          key={workshop.name}
          latitude={workshop.latitude}
          longitude={workshop.longitude}
          onClick={() =>
            setTimeout(() => {
              setPopupData({ type: "Workshop", element: workshop });
            }, 100)
          }
        >
          <Image src={WorkshopIcon} alt="" />
        </Marker>
      ));
  }, [workshops]);

  const onMapLoaded = () => {
    if (!mapRef.current) {
      return;
    }

    const bounds = inventories.reduce((acc, { latitude, longitude }) => {
      if (latitude && longitude) {
        return acc.extend([longitude, latitude]);
      }
      return acc;
    }, new maplibregl.LngLatBounds());
    mapRef.current.fitBounds(bounds, { padding: { left: 40, right: 40 } });
  };

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView.valueOf()) {
        if (!mapRef.current) {
          return;
        }
        if (mapAlreadyMoved) {
          return;
        }
        if (!selectedInventory) {
          return;
        }
        setTimeout(() => {
          mapRef.current?.flyTo({
            center: {
              lat: selectedInventory.latitude,
              lng: selectedInventory.longitude,
            },
            duration: 1000,
	    zoom: 14
          });
          setMapAlreadyMoved(true);
        }, 1500);
      }
    },
  });

  return (
    <div className="w-full h-[560px]" ref={ref}>
      <Map
        ref={mapRef}
        onLoad={onMapLoaded}
        mapStyle={`https://maps.geo.us-east-1.amazonaws.com/maps/v0/maps/${process.env.NEXT_PUBLIC_MAP_NAME}/style-descriptor?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
        scrollZoom={false}
      >
        {!!popupData ? (
          <Popup
            longitude={popupData.element.longitude}
            latitude={popupData.element.latitude}
            onClose={() => setPopupData(undefined)}
            className="z-[60]"
            closeButton={false}
          >
            <InventoryWorkshopPopup
              element={popupData.element}
              type={popupData.type}
            />
          </Popup>
        ) : null}
        {inventoryMarkers}
        {workshopMarkers}
      </Map>
    </div>
  );
}
