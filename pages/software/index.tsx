import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import DataTable from '../../components/shared/DataTable';
import { format } from 'date-fns';

interface Software {
  id: number;
  name: string;
  version: string;
  licenseKey: string | null;
  expiryDate: string | null;
  assetId: number;
}

export default function Software() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);
  const queryClient = useQueryClient();

  const { data: software = [], isLoading } = useQuery({
    queryKey: ['software'],
    queryFn: async () => {
      const response = await fetch('/api/software');
      return response.json();
    },
  });

  const updateSoftwareMutation = useMutation({
    mutationFn: async (updatedSoftware: Software) => {
      const response = await fetch(`/api/software/${updatedSoftware.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSoftware),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['software'] });
      setOpenDialog(false);
    },
  });

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'version', label: 'Version', minWidth: 100 },
    { id: 'licenseKey', label: 'License Key', minWidth: 170 },
    { id: 'expiryDate', label: 'Expiry Date', minWidth: 170 },
    { id: 'assetId', label: 'Asset ID', minWidth: 100 },
  ];

  const filteredSoftware = software.filter((item: Software) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formattedSoftware = filteredSoftware.map((item: Software) => ({
    ...item,
    expiryDate: item.expiryDate
      ? format(new Date(item.expiryDate), 'yyyy-MM-dd')
      : 'N/A',
  }));

  const handleEdit = (software: Software) => {
    setSelectedSoftware(software);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (selectedSoftware) {
      updateSoftwareMutation.mutate(selectedSoftware);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Software
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
          data={formattedSoftware}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Software</DialogTitle>
        <DialogContent>
          {selectedSoftware && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Name"
                fullWidth
                value={selectedSoftware.name}
                onChange={(e) =>
                  setSelectedSoftware({ ...selectedSoftware, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Version"
                fullWidth
                value={selectedSoftware.version}
                onChange={(e) =>
                  setSelectedSoftware({ ...selectedSoftware, version: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="License Key"
                fullWidth
                value={selectedSoftware.licenseKey || ''}
                onChange={(e) =>
                  setSelectedSoftware({
                    ...selectedSoftware,
                    licenseKey: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                value={selectedSoftware.expiryDate?.split('T')[0] || ''}
                onChange={(e) =>
                  setSelectedSoftware({
                    ...selectedSoftware,
                    expiryDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
} 