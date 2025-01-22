import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CSwitch from 'src/components/UI/CSwitch/CSwitch';
import CAccordionMenu from 'src/components/UI/CAccordionMenu/CAccordionMenu';
import { homeNavbarStyles } from './styles';

// Mock version of HomeNavbar without Redux dependencies
const MockHomeNavbar = ({ children }: { children?: React.ReactNode }) => {
  const theme = createTheme();
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const handleSwitchChange = () => {
    setChecked(!checked);
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const displayTabletMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <AppBar data-testid="AppBar" position="static" component="nav">
        <Toolbar sx={homeNavbarStyles(theme).toolBar}>
          <Box sx={homeNavbarStyles(theme).container}>
            <Box sx={homeNavbarStyles(theme).pagesContainer}>
              <IconButton
                onClick={() => console.log('Navigate to home')}
                sx={homeNavbarStyles(theme).buttonIcon}
              >
                <HomeIcon />
              </IconButton>
              {isTablet && (
                <>
                  <IconButton
                    onClick={displayTabletMenu}
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
            </Box>
            <Box sx={homeNavbarStyles(theme).userInfo}>
              <Typography>Mock User</Typography>
              <Box sx={homeNavbarStyles(theme).switchTheme}>
                <CSwitch
                  onChange={handleSwitchChange}
                  checked={checked}
                  color="default"
                />
                {mode === 'dark' ? <NightlightIcon /> : <WbSunnyIcon />}
              </Box>
              <IconButton
                sx={homeNavbarStyles(theme).buttonIcon}
                onClick={() => console.log('Logout clicked')}
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

const meta = {
  title: 'Layouts/HomeNavbar',
  component: MockHomeNavbar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme()}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MockHomeNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Sample Content</Typography>
        <Typography>This is some sample content for the navbar layout.</Typography>
      </Box>
    ),
  },
};

// Tablet view with menu
export const TabletView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    themes: {
      default: 'dark',
    },
  },
};