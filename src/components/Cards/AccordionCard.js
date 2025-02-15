import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const AccordionCard = ({ title, summary, isExpanded, onToggle, panelId ,sn}) => {
  return (
    <Accordion expanded={isExpanded} onChange={onToggle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${panelId}-content`}
        id={`panel${panelId}-header`}
      >
        <Typography
          component="span"
          className="text-primary font-medium text-xl"
        >
         {sn}. {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className="text-textGray">{summary}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default AccordionCard;
