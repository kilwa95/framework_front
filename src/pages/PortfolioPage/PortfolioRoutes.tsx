import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PortfolioPage from './ComponentsPages/PortfolioPage/PortfolioPage';
import TextfieldPage from './ComponentsPages/TextfieldPage/TextfieldPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import ButtonPage from './ComponentsPages/ButtonPage/ButtonPage';
import DatePage from './ComponentsPages/DatePage/DatePage';
import ModalPage from './ComponentsPages/ModalPage/ModalPage';
import UIPage from './ComponentsPages/UIPage/UIPage';
import ChartPage from './ComponentsPages/ChartPage/ChartPage';
import TablePage from './ComponentsPages/TablePage/TablePage';
import TransitionPage from './ComponentsPages/TransitionPage/TransitionPage';
import SnackAlertPage from './ComponentsPages/SnackAlertPage/SnackAlertPage';
import { ROUTES_PORTFOLIO } from 'src/utils/const/routes';
interface Props {
  children?: React.ReactNode;
}

const PortfolioRoutes: React.FC<Props> = () => (
  <Routes>
    <Route
      path={ROUTES_PORTFOLIO.portfolioHome.path}
      element={<PortfolioPage />}
    />
    <Route path={ROUTES_PORTFOLIO.textfield.path} element={<TextfieldPage />} />
    <Route path={ROUTES_PORTFOLIO.button.path} element={<ButtonPage />} />
    <Route path={ROUTES_PORTFOLIO.date.path} element={<DatePage />} />
    <Route path={ROUTES_PORTFOLIO.modal.path} element={<ModalPage />} />
    <Route path={ROUTES_PORTFOLIO.ui.path} element={<UIPage />} />
    <Route path={ROUTES_PORTFOLIO.chart.path} element={<ChartPage />} />
    <Route path={ROUTES_PORTFOLIO.table.path} element={<TablePage />} />
    <Route
      path={ROUTES_PORTFOLIO.transition.path}
      element={<TransitionPage />}
    />
    <Route
      path={ROUTES_PORTFOLIO.snackalert.path}
      element={<SnackAlertPage />}
    />
    <Route path={ROUTES_PORTFOLIO.portfolioHome.path} element={<ErrorPage />} />
  </Routes>
);

export default PortfolioRoutes;
