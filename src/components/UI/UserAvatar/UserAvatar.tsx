import React, { useMemo } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { userAvatarStyles } from './styles';

interface UserAvatarProps {
  src: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  sx?: SxProps<Theme>;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ size = 'sm', src, sx }) => {
  const sizeInPx = useMemo(() => {
    switch (size) {
      case 'xs':
        return '18px';
        break;
      case 'md':
        return '64px';
        break;
      case 'lg':
        return '160px';
        break;
      default:
        return '32px';
    }
  }, [size]);

  return (
    <Box
      sx={[
        userAvatarStyles().avatar(sizeInPx),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <img src={src} aria-label="avatar" />
    </Box>
  );
};

export default UserAvatar;
