'use client';

import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Layout from '@/components/layout/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Total Assets
              </Typography>
              <Typography component="p" variant="h4">
                0
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Active Software Licenses
              </Typography>
              <Typography component="p" variant="h4">
                0
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Pending Renewals
              </Typography>
              <Typography component="p" variant="h4">
                0
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Active Purchase Orders
              </Typography>
              <Typography component="p" variant="h4">
                0
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
} 