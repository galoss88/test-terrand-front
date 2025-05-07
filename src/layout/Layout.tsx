import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
    }}>
      <Header />
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: 1, sm: 2, md: 3 },
          overflowX: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;