import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Analytics from '@mui/icons-material/AnalyticsTwoTone';
import DiscoverIcon from '@mui/icons-material/FindInPage';
import ExtractIcon from '@mui/icons-material/FileCopy';
import { Routes, Route, BrowserRouter, Link, useNavigation, Outlet } from 'react-router-dom';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import Routings from './routes';
const NAVIGATION = [

  {
    segment: 'view',
    title: 'View',
    icon: <DashboardIcon />,
  },
  {
    segment: 'discover',
    title: 'Discover',
    icon: <DiscoverIcon />,
  },
  {
    segment: 'extract',
    title: 'Extract',
    icon: <ExtractIcon />,
  },
  {
    segment: 'analyze',
    title: 'Analyze',
    icon: <Analytics />,
  },
  {
     segment: 'report',
     title: 'Report',
     icon: <LayersIcon />,
   }
];
const BRANDING = {
  title: 'Self-Service Portfolio',
};

function App(props) {
  const theme = createTheme({
    typography : {
      fontFamily : "'Montserrat', sans-serif",
    },
  })
  const router = useDemoRouter('/');
  console.log(router);
  

  return (
    // preview-start
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING} theme={theme}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
export default App;