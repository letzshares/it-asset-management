import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import DataTable from '../../components/shared/DataTable';
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

export default function History() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await fetch('/api/history');
      return response.json();
    },
  });

  const columns = [
    { id: 'assetId', label: 'Asset ID', minWidth: 100 },
    { id: 'modifiedDate', label: 'Modified Date', minWidth: 170 },
    { id: 'userId', label: 'User ID', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'modifiedBy', label: 'Modified By', minWidth: 100 },
    { id: 'lastVisited', label: 'Last Visited', minWidth: 170 },
  ];

  const filteredHistory = history.filter((record: HistoryRecord) =>
    Object.values(record).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formattedHistory = filteredHistory.map((record: HistoryRecord) => ({
    ...record,
    modifiedDate: format(new Date(record.modifiedDate), 'yyyy-MM-dd HH:mm:ss'),
    lastVisited: format(new Date(record.lastVisited), 'yyyy-MM-dd HH:mm:ss'),
  }));

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
        <DataTable
          columns={columns}
          data={formattedHistory}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </Layout>
  );
} 