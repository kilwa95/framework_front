import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useIsTabletPortait from 'src/hooks/useIsTablet';
import { loginPageStyles } from './styles';
import { useState } from 'react';
import Freelogo from 'src/assets/images/Free_logo.svg';
import LoginForm from './LoginForm';
import ForgetPasswordForm from './ForgetPasswordForm';
import RegisterForm from './RegisterForm';

const LoginPage = () => {
  const isTablet = useIsTabletPortait();
  const theme = useTheme();

  const [isResetingPassword, setIsResetingPassword] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const handleNavigateTo = (type: 'resetPassword' | 'register') => {
    if (type === 'resetPassword') {
      setIsResetingPassword(!isResetingPassword);
    } else if (type === 'register') {
      setIsRegistering(!isRegistering);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Image xs={false} sm={false} md={7} />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '90%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            {isTablet && (
              <Box sx={loginPageStyles(theme).logoTablet}>
                <img
                  src={Freelogo}
                  style={{ width: '200px' }}
                  alt="Logo Free"
                />
              </Box>
            )}
            <Typography variant="h1" sx={loginPageStyles(theme).appName}>
              Application Boilerplate
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box sx={{ width: '100%', maxWidth: '500px' }}>
              {isRegistering && <RegisterForm navigation={handleNavigateTo} />}
              {isResetingPassword && (
                <ForgetPasswordForm navigation={handleNavigateTo} />
              )}
              {!isResetingPassword && !isRegistering && (
                <LoginForm navigation={handleNavigateTo} />
              )}
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
          <Box sx={loginPageStyles(theme).versionWrapper}>
            <Typography sx={loginPageStyles(theme).textColor} variant="body2">
              Version : 1.1.0
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://portail.free.fr/" target="_blank">
        Free Réseau
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Image = ({
  xs = false,
  sm = false,
  md = false,
}: {
  xs?: boolean | number;
  sm?: boolean | number;
  md?: boolean | number;
}) => (
  <Grid
    item
    xs={xs}
    sm={sm}
    md={md}
    sx={{
      backgroundImage:
        'url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Free_logo.svg/640px-Free_logo.svg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundPosition: 'center',
    }}
  />
);

export default LoginPage;
