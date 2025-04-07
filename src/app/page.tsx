'use client';

import { Box, Container, Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  Inventory2 as AssetsIcon,
  History as HistoryIcon,
  Computer as SoftwareIcon,
  Store as VendorsIcon,
  ShoppingCart as PurchaseOrderIcon,
  Refresh as RenewalIcon
} from '@mui/icons-material';

export default function Home() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'Assets',
      description: 'Manage IT assets and equipment',
      icon: <AssetsIcon sx={{ fontSize: 40 }} />,
      path: '/assets'
    },
    {
      title: 'History',
      description: 'View asset history and changes',
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      path: '/history'
    },
    {
      title: 'Software',
      description: 'Manage software licenses',
      icon: <SoftwareIcon sx={{ fontSize: 40 }} />,
      path: '/software'
    },
    {
      title: 'Vendors',
      description: 'Manage vendor information',
      icon: <VendorsIcon sx={{ fontSize: 40 }} />,
      path: '/vendors'
    },
    {
      title: 'Purchase Orders',
      description: 'Track purchase orders',
      icon: <PurchaseOrderIcon sx={{ fontSize: 40 }} />,
      path: '/po-tracking'
    },
    {
      title: 'License Renewals',
      description: 'Track software license renewals',
      icon: <RenewalIcon sx={{ fontSize: 40 }} />,
      path: '/renewals'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
        IT Asset Management System
      </Typography>
      
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <CardActionArea 
                sx={{ height: '100%' }}
                onClick={() => router.push(item.path)}
              >
                <CardContent>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 2
                    }}
                  >
                    {item.icon}
                    <Typography variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 