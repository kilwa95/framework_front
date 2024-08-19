import React from 'react';
import {
  ListItem,
  ListItemButton,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { cSelectMenuStyles } from './styles';

type CSelectItemProps = {
  onClick?: () => void;
  title: string;
  isHighlighted?: boolean;
  sx?: SxProps<Theme>;
};

const CSelectItem: React.FC<CSelectItemProps> = ({
  isHighlighted = false,
  onClick,
  title,
  sx,
}) => {
  const theme = useTheme();

  return (
    <>
      {onClick ? (
        <ListItemButton
          onClick={() => onClick()}
          sx={[
            cSelectMenuStyles(theme).itemList(isHighlighted),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Typography>{title}</Typography>
        </ListItemButton>
      ) : (
        <ListItem
          sx={[
            cSelectMenuStyles(theme).itemList(isHighlighted),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {title}
          </Typography>
        </ListItem>
      )}
    </>
  );
};

export default CSelectItem;
