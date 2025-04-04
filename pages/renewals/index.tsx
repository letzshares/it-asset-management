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
  Alert,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import DataTable from '../../components/shared/DataTable';
import { format, isAfter } from 'date-fns';

interface LicenseRenewal {
  id: number;
  softwareId: number;
  expiryDate: string;
  status: string;
  software: {
    name: string;
    version: string;
  };
}

export default function Renewals() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRenewal, setSelectedRenewal] = useState<LicenseRenewal | null>(null);
  const queryClient = useQueryClient();

  const { data: renewals = [], isLoading } = useQuery({
    queryKey: ['renewals'],
    queryFn: async () => {
      const response = await fetch('/api/renewals');
      return response.json();
    },
  });

  const updateRenewalMutation = useMutation({
    mutationFn: async (updatedRenewal: LicenseRenewal) => {
      const response = await fetch(`/api/renewals/${updatedRenewal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRenewal),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['renewals'] });
      setOpenDialog(false);
    },
  });

  const columns = [
    { id: 'software', label: 'Software', minWidth: 170 },
    { id: 'version', label: 'Version', minWidth: 100 },
    { id: 'expiryDate', label: 'Expiry Date', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
  ];

  const filteredRenewals = renewals.filter((renewal: LicenseRenewal) =>
    Object.values(renewal).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formattedRenewals = filteredRenewals.map((renewal: LicenseRenewal) => ({
    ...renewal,
    software: renewal.software.name,
    version: renewal.software.version,
    expiryDate: format(new Date(renewal.expiryDate), 'yyyy-MM-dd'),
  }));

  const handleEdit = (renewal: LicenseRenewal) => {
    setSelectedRenewal(renewal);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (selectedRenewal) {
      updateRenewalMutation.mutate(selectedRenewal);
    }
  };

  const getRenewalStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return 'Expired';
    } else if (daysUntilExpiry <= 30) {
      return 'Expiring Soon';
    } else {
      return 'Active';
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          License Renewals
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
          data={formattedRenewals}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit License Renewal</DialogTitle>
        <DialogContent>
          {selectedRenewal && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                {getRenewalStatus(selectedRenewal.expiryDate)}
              </Alert>
              <TextField
                label="Software"
                fullWidth
                value={selectedRenewal.software.name}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Version"
                fullWidth
                value={selectedRenewal.software.version}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                value={selectedRenewal.expiryDate.split('T')[0]}
                onChange={(e) =>
                  setSelectedRenewal({
                    ...selectedRenewal,
                    expiryDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedRenewal.status}
                  onChange={(e) =>
                    setSelectedRenewal({ ...selectedRenewal, status: e.target.value })
                  }
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                  <MenuItem value="Renewed">Renewed</MenuItem>
                </Select>
              </FormControl>
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