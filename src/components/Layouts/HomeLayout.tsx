import React, { Suspense } from 'react';
import HomeNavbar from './layoutsComponents/HomeNavbar/HomeNavbar';
import CCircularProgress from '../UI/CCircularProgress/CCircularProgress';
import { useAppSelector } from 'src/hooks';

interface Props {
  children?: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.login.token.access);

  return (
    <>
      {token ? (
        <HomeNavbar>
          <Suspense
            fallback={
              <CCircularProgress sx={{ height: 'calc(100vh - 64px)' }} />
            }
          >
            {children}
          </Suspense>
        </HomeNavbar>
      ) : (
        { children }
      )}
    </>
  );
};

export default HomeLayout;
