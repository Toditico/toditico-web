import styled from "@emotion/styled";
import { Popup } from "react-leaflet";

export const NoPaddingPopup = styled(Popup)`
  div.leaflet-popup-content-wrapper {
    & > div.leaflet-popup-content {
      margin: 10px;
      & p {
        margin: 0;
      }
    }
  }
  a.leaflet-popup-close-button {
    display: none;
  }
`;
