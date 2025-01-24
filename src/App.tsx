import { Suspense } from 'react';
import CCircularProgress from './components/UI/CCircularProgress/CCircularProgress';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/PrivateRoute/PrivateRoute';
import { ROUTES } from './utils/const/routes';
import PortfolioLayout from './components/Layouts/PortfolioLayout';
import HomeLayout from './components/Layouts/HomeLayout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PortfolioRoutes from './pages/PortfolioPage/PortfolioRoutes';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import NetworkSites from './pages/NetworkSites/NetworkSites';

function App() {
  return (
    <Suspense fallback={<CCircularProgress />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/portfolio/*"
          element={
            <PortfolioLayout>
              <PortfolioRoutes />
            </PortfolioLayout>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute children={undefined}>
              <HomeLayout>
                <Suspense fallback={<CCircularProgress />}>
                  <Routes>
                    <Route
                      path={ROUTES.home.path}
                      element={
                        <ProtectedRoute redirectPath="/">
                          <LandingPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/network" element={<NetworkSites />} />
                    <Route path={ROUTES.error.path} element={<ErrorPage />} />
                  </Routes>
                </Suspense>
              </HomeLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
