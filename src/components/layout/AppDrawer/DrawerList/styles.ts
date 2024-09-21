import styled from "@emotion/styled";
import { Accordion, AccordionSummary } from "@mui/material";

export const AccordionStyled = styled(Accordion)`
  .MuiAccordionSummary-root.Mui-expanded {
    min-height: 48px;
  }
  .MuiCollapse-vertical > .MuiAccordion-region > .MuiAccordionDetails-root {
    padding-top: 0;
  }
`;

export const AccordionSummaryStyled = styled(AccordionSummary)`
  height: 48px;
  .MuiAccordionSummary-content.Mui-expanded {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
