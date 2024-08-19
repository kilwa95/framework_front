import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';
import jwt_decode from 'jwt-decode';
import { ROUTES, ROUTES_AUTH } from 'src/utils/const/routes';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectPath?: string;
  rolesHaveAccess?: string[];
}

interface TokenDecodedProps {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  role: string;
}

const ProtectedRoute = ({
  children,
  redirectPath, // rolesHaveAccess = ['DR', 'HR', 'MG'],
}: ProtectedRouteProps) => {
  const token = useAppSelector((state) => state.auth.login.token);
  const tokenDecoded: TokenDecodedProps | null = token.access
    ? jwt_decode(token.access)
    : null;

  const isTokenValid = tokenDecoded && tokenDecoded.exp * 1000 > Date.now();
  const hasAccess = tokenDecoded;
  // && rolesHaveAccess?.includes(tokenDecoded.role);

  const renderContent = () => {
    if (isTokenValid) {
      return hasAccess ? (
        children
      ) : (
        <Navigate to={redirectPath || ROUTES.home.path} replace />
      );
    } else {
      return <Navigate to={ROUTES_AUTH.login.path} replace />;
    }
  };

  return <>{renderContent()}</>;
};

export default ProtectedRoute;
