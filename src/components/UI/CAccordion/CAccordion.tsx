import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Link,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { AccordionItem } from '../types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { cAccordionStyles } from './styles';

interface CMenuButtonProps {
  accordionsItems: AccordionItem[];
  defaultExpanded?: number | false;
  sx?: SxProps<Theme>;
}

const CMenuButton: React.FC<CMenuButtonProps> = ({
  accordionsItems,
  defaultExpanded = false,
  sx,
}) => {
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState<number | false>(
    defaultExpanded,
  );

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleActionPreventPropagation = ({
    event,
    onClick,
  }: {
    event: React.MouseEvent;
    onClick: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };

  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {accordionsItems.map((accordion) => (
        <Accordion
          key={`accordion-${accordion.id}`}
          expanded={expanded === accordion.id}
          onChange={handleChange(accordion.id)}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`content-${accordion.id}`}
            id={`header-${accordion.id}`}
          >
            <Box sx={cAccordionStyles(theme).titleWrapper}>
              <Typography color="primary">{accordion.title}</Typography>
              {accordion.actions && accordion.actions?.length > 0 && (
                <>
                  {accordion.actions.map((action) => (
                    <Box
                      key={`action-${action.id}`}
                      sx={cAccordionStyles(theme).iconsWrapper}
                    >
                      {action.icon ? (
                        <Tooltip title={action.label}>
                          <IconButton
                            onClick={(event) =>
                              handleActionPreventPropagation({
                                event,
                                onClick: action.onClick,
                              })
                            }
                            color="primary"
                          >
                            {action.icon}
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Link onClick={action.onClick}>{action.label}</Link>
                      )}
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>{accordion.content}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CMenuButton;
