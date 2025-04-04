'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { format } from 'date-fns';

interface HistoryRecord {
  id: number;
  assetId: number;
  modifiedDate: string;
  userId: string;
  status: string;
  modifiedBy: string;
  lastVisited: string;
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await fetch('/api/history');
      return response.json();
    },
  });

  const filteredHistory = history.filter((record: HistoryRecord) =>
    Object.values(record).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          History
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset ID</TableCell>
                <TableCell>Modified Date</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Modified By</TableCell>
                <TableCell>Last Visited</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHistory.map((record: HistoryRecord) => (
                <TableRow key={record.id}>
                  <TableCell>{record.assetId}</TableCell>
                  <TableCell>
                    {format(new Date(record.modifiedDate), 'MM/dd/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>{record.userId}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.modifiedBy}</TableCell>
                  <TableCell>
                    {format(new Date(record.lastVisited), 'MM/dd/yyyy HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
} 