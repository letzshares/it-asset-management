import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, CssBaseline } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Computer as ComputerIcon,
  Business as BusinessIcon,
  Receipt as ReceiptIcon,
  Update as UpdateIcon,
  Code as CodeIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';

const drawerWidth = 240;

const menuItems = [
  { text: 'Assets', icon: <DashboardIcon />, path: '/assets' },
  { text: 'History', icon: <HistoryIcon />, path: '/history' },
  { text: 'Software', icon: <ComputerIcon />, path: '/software' },
  { text: 'Vendors', icon: <BusinessIcon />, path: '/vendors' },
  { text: 'PO Tracking', icon: <ReceiptIcon />, path: '/po-tracking' },
  { text: 'Renewals', icon: <UpdateIcon />, path: '/renewals' },
  { text: 'ID Codes', icon: <CodeIcon />, path: '/id-codes' },
  { text: 'Upload', icon: <CloudUploadIcon />, path: '/upload' },
  { text: 'Update', icon: <CloudDownloadIcon />, path: '/update' },
  { text: 'Admin', icon: <AdminIcon />, path: '/admin' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            IT Asset Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <Link href={item.path} key={item.text} passHref>
                <ListItem
                  button
                  selected={router.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 