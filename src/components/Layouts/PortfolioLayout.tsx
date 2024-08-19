import React, { Suspense } from 'react';
import CLeftSideMenu from './layoutsComponents/CLeftSideMenu/CLeftSideMenu';
import MenuList from 'src/pages/PortfolioPage/PortfolioMenuList/PortfolioMenuList';
import CCircularProgress from '../UI/CCircularProgress/CCircularProgress';
import HomeNavbar from './layoutsComponents/HomeNavbar/HomeNavbar';

interface Props {
  children?: React.ReactNode;
}

const PortfolioLayout: React.FC<Props> = ({ children }) => (
  <HomeNavbar>
    <CLeftSideMenu menuList={<MenuList />}>
      <Suspense
        fallback={<CCircularProgress sx={{ height: 'calc(100vh - 64px)' }} />}
      >
        {children}
      </Suspense>
    </CLeftSideMenu>
  </HomeNavbar>
);

export default PortfolioLayout;
