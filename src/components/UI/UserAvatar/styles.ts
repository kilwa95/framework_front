import { SxProps } from '@mui/material';

interface UserAvatarStyles {
  avatar: (
    // eslint-disable-next-line no-unused-vars
    size: string,
  ) => SxProps;
}

export const userAvatarStyles = (): UserAvatarStyles => ({
  avatar: (size) => ({
    display: 'flex',
    '& > img': {
      width: size,
      height: size,
      borderRadius: '50%',
      objectFit: 'cover',
    },
  }),
});
