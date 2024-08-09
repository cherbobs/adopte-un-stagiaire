import styled from "@emotion/styled";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { LeftMenu } from "./LeftMenu";
import { Dashboard } from "./dashboard/Dashboard";
import { Parametres } from './dashboard/Parametres';
import { AppTheme } from "./Theme";
import { DetailsOffre } from './Offres/DetailsOffre';
import ErrorPage from "./error/ErrorPage";
import { Offre } from "./dashboard/Offre";

const drawerWidth = 230;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "offres",
        element: <Offre />,
      },
      {
        path: "parametres",
        element: <Parametres />,
      },
      {
        path: "favoris",
        element: <Box>Mes favoris</Box>,
      },
      {
        path: "details/:id",
        element: <DetailsOffre/>,
      },
    ],
  },
]);

const MainBox = styled(Box)`
  display: flex;
  height: 100vh;
  `;
  
  const ContentBox = styled(Box)`
  flex-grow: 1;
  padding: 16px;
  // background: green
`;

function Layout() {
  return (
    <AppTheme>
      <MainBox>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <LeftMenu />
        </Drawer>
        <ContentBox component="main">
          <Toolbar />
          <Outlet />
        </ContentBox>
      </MainBox>
    </AppTheme>
  );
}

export function App() {
  return <RouterProvider router={router} />;
}
