import React, { useCallback, useState } from 'react';
import { Box, MenuItem, useTheme } from '@mui/material';
import { AppBarMenuProps } from '../types';
import { Link } from 'react-router-dom';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { appBarMenuStyles } from './styles';
import { Stage } from 'src/utils/types/MenuStage';
import { AnimatePresence, motion } from 'framer-motion';

const AppBarMenu = <T extends Stage | string>({
  url,
  menuName,
  menuItems,
  onClose,
}: AppBarMenuProps<T>) => {
  const BASE_URL = `/${menuName}/`;
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getMenuItemUrl = (item: string | Stage) => {
    if ((item as Stage).redirect) {
      return window.location.href;
    }
    if (typeof item === 'string') {
      return `${url}/${item}`;
    } else if ('id' in item) {
      const stageUrl = 'url' in item ? item.url : '';

      return `${BASE_URL}${stageUrl}`;
    } else {
      throw new Error('Item must be either a string or an object with an id');
    }
  };

  const onOpenTitle = useCallback(
    (item: Stage): void => {
      if (item.redirect) {
        window.open(`${item.url}`, '_blank');
      }
      onClose();
    },
    [dispatch, onClose],
  );

  return (
    <Box onMouseLeave={() => setIsOpen(false)}>
      <AnimatePresence>
        {isOpen && (
          <Box
            component={motion.div}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            sx={appBarMenuStyles(theme).menuContainer}
          >
            <Box sx={appBarMenuStyles(theme).menuPadding} />
            {menuItems.map((item, index) => (
              <MenuItem
                component={Link}
                to={getMenuItemUrl(item)}
                key={index}
                onClick={() => onOpenTitle(item as Stage)}
              >
                {typeof item === 'string' ? item : item.name}
              </MenuItem>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AppBarMenu;
