import React from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/authcontent";

const drawerWidth = 220;

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const items = [
    { to: "/blogs", icon: <ArticleIcon/>, label: "Blogs" },
    { to: "/pages", icon: <DescriptionIcon/>, label: "Pages" },
    { to: "/placements", icon: <ViewModuleIcon/>, label: "Placements" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Panel</Typography>
          <Typography sx={{ cursor: "pointer" }} onClick={logout}>Logout</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }}}>
        <Toolbar />
        <List>
          {items.map((it) => (
            <ListItemButton key={it.to} component={Link} to={it.to} selected={pathname.startsWith(it.to)}>
              <ListItemIcon>{it.icon}</ListItemIcon>
              <ListItemText primary={it.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}