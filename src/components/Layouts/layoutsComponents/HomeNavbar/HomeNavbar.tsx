import React, { useCallback, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import useMenuAnchors from 'src/hooks/useMenuAnchors';
import AppBarMenu from 'src/components/UI/AppBarMenu/AppBarMenu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { menu1 } from 'src/utils/menu';
import useIsTablet from 'src/hooks/useIsTablet';
import CAccordionMenu from 'src/components/UI/CAccordionMenu/CAccordionMenu';
import {
  leftMenuOpened,
  switchThemeMode,
} from 'src/store/navigation/navigationSlice';
import { homeNavbarStyles } from './styles';
import { useAppSelector } from 'src/hooks';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useNavigate } from 'react-router-dom';
import { Stage } from 'src/utils/types/MenuStage';
import { getUserInfosAsync } from 'src/store/auth/authAsync';
import CSwitch from 'src/components/UI/CSwitch/CSwitch';
import { ROUTES, ROUTES_AUTH } from 'src/utils/const/routes';
interface Props {
  children?: React.ReactNode;
}

const HomeNavbar: React.FC<Props> = ({ children }) => {
  const { anchorEls, handleOpenMenu, handleCloseMenu } = useMenuAnchors();
  const dispatch = useDispatch<AppDispatch>();
  const isTablet = useIsTablet();
  const theme = useTheme();

  const mode = useAppSelector((state) => state.nav.themeMode);
  const [checked, setChecked] = React.useState(mode === 'dark');

  const menuOpen = useAppSelector((state) => state.nav.leftMenuOpened);
  const user = useAppSelector((state) => state.auth.login.user);
  const navigate = useNavigate();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(switchThemeMode(mode === 'light' ? 'dark' : 'light'));
  };

  const displayTabletMenu = () => {
    dispatch(leftMenuOpened(!menuOpen));
  };

  const handleGetUserInfos = useCallback(() => {
    dispatch(getUserInfosAsync());
  }, [dispatch]);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setChecked(true);
      dispatch(switchThemeMode('dark'));
    }
  }, []);

  useEffect(() => {
    handleGetUserInfos();
  }, [handleGetUserInfos]);

  const roleHaveAccessMenu: Stage[] = menu1;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <AppBar data-testid="AppBar" position="static" component="nav">
        <Toolbar sx={homeNavbarStyles(theme).toolBar}>
          <Box sx={homeNavbarStyles(theme).container}>
            <Box sx={homeNavbarStyles(theme).pagesContainer}>
              <IconButton
                onClick={() => navigate(ROUTES.home.path)}
                sx={homeNavbarStyles(theme).buttonIcon}
              >
                <HomeIcon />
              </IconButton>
              <Button
                onClick={() => navigate('/chartpage')}
                variant="contained"
              >
                chartPage
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/network')}
                sx={{ ml: 1 }}
              >
                Sites Réseau
              </Button>
              {isTablet && (
                <>
                  <IconButton
                    onClick={() => displayTabletMenu()}
                    sx={homeNavbarStyles(theme).buttonIcon}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="left"
                    open={menuOpen}
                    onClose={displayTabletMenu}
                    sx={homeNavbarStyles(theme).drawer}
                  >
                    <CAccordionMenu />
                  </Drawer>
                </>
              )}
              {!isTablet && (
                <Box sx={homeNavbarStyles(theme).menuContainer}>
                  <AppBarMenu
                    menuName="Menu1"
                    url="menu1"
                    menuItems={roleHaveAccessMenu}
                    anchorEl={anchorEls.menu1}
                    onOpen={(
                      event: React.MouseEvent<HTMLElement, MouseEvent>
                    ) => handleOpenMenu(event, 'menu1')}
                    onClose={() => handleCloseMenu('menu1')}
                  />
                  <AppBarMenu
                    menuName="Menu1"
                    url="menu1"
                    menuItems={roleHaveAccessMenu}
                    anchorEl={anchorEls.menu1}
                    onOpen={(
                      event: React.MouseEvent<HTMLElement, MouseEvent>
                    ) => handleOpenMenu(event, 'menu1')}
                    onClose={() => handleCloseMenu('menu1')}
                  />
                  <AppBarMenu
                    menuName="Menu1"
                    url="menu1"
                    menuItems={roleHaveAccessMenu}
                    anchorEl={anchorEls.menu1}
                    onOpen={(
                      event: React.MouseEvent<HTMLElement, MouseEvent>
                    ) => handleOpenMenu(event, 'menu1')}
                    onClose={() => handleCloseMenu('menu1')}
                  />
                </Box>
              )}
            </Box>
            <Box sx={homeNavbarStyles(theme).userInfo}>
              <Typography>{user?.username}</Typography>
              {/* <NotificationMenu isNavBar /> Uncomment if project has Notifications */}
              <Box sx={homeNavbarStyles(theme).switchTheme}>
                <CSwitch
                  onChange={handleSwitchChange}
                  checked={checked}
                  color="default"
                />
                {theme.palette.mode === 'dark' ? (
                  <NightlightIcon />
                ) : (
                  <WbSunnyIcon />
                )}
              </Box>
              <IconButton
                sx={homeNavbarStyles(theme).buttonIcon}
                onClick={() => {
                  navigate(ROUTES_AUTH.login.path);
                  dispatch({ type: 'store/reset' });
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={homeNavbarStyles(theme).mainWrapper} component="main">
        {children}
      </Container>
    </Box>
  );
};

export default HomeNavbar;
