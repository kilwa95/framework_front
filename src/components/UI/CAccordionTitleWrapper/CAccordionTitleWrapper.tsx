import React from 'react';
import { cAccordionTitleWrapperStyles } from './styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

interface CAccordionTitleWrapperProps {
  title: string;
  defaultExpanded?: boolean;
  isBigWrapper?: boolean;
  coloredTitle?: boolean;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const CAccordionTitleWrapper: React.FC<CAccordionTitleWrapperProps> = ({
  title,
  isBigWrapper = false,
  coloredTitle = false,
  defaultExpanded = false,
  children,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      square
      sx={cAccordionTitleWrapperStyles(theme).wrapper}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ borderRadius: theme.shape.borderRadius }}
      >
        <Typography
          variant={isBigWrapper ? 'h4' : 'h6'}
          color={coloredTitle ? 'primary' : 'unset'}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={[
          cAccordionTitleWrapperStyles(theme).contentWrapper,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CAccordionTitleWrapper;
