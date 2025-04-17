"use client";

import Map, { Marker, Popup } from "react-map-gl/maplibre";
import { NavigationControl } from "react-map-gl/maplibre";
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
import { useWindowSize } from "@/hooks/useWindowSize";
import { breakpoints } from "@/constants/breakpoints";

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
  const [mapInteractionEnabled, setMapInteractionEnabled] = useState(false);
  const { width } = useWindowSize();

  const paddingValue = width < breakpoints.tablet ? 40 : 200;
  const padding: maplibregl.PaddingOptions = {
    left: paddingValue,
    right: paddingValue,
    top: 0,
    bottom: 0,
  };

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
            duration: 2000,
            zoom: 14,
            padding: padding,
          });
          setMapAlreadyMoved(true);
          setTimeout(() => {
            setMapInteractionEnabled(true);
          }, 2000);
        }, 3500);
      }
    },
  });

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    setTimeout(() => {
      const bounds = inventories.reduce((acc, { latitude, longitude }) => {
        if (latitude && longitude) {
          return acc.extend([longitude, latitude]);
        }
        return acc;
      }, new maplibregl.LngLatBounds());

      mapRef.current!.fitBounds(bounds, { padding: padding });
    }, 500);
  }, [mapRef.current]);

  return (
    <div className="w-full h-[560px] xl:h-[720px]" ref={ref}>
      <Map
        ref={mapRef}
        mapStyle={`https://maps.geo.us-east-1.amazonaws.com/maps/v0/maps/${process.env.NEXT_PUBLIC_MAP_NAME}/style-descriptor?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
        scrollZoom={false}
        dragPan={mapInteractionEnabled}
        dragRotate={mapInteractionEnabled}
        attributionControl={false}
      >
        <NavigationControl showZoom={width >= breakpoints.desktop} showCompass={false} visualizePitch={false} />
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
