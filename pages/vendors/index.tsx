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
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import DataTable from '../../components/shared/DataTable';

interface Vendor {
  id: number;
  name: string;
  contact: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export default function Vendors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const queryClient = useQueryClient();

  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const response = await fetch('/api/vendors');
      return response.json();
    },
  });

  const updateVendorMutation = useMutation({
    mutationFn: async (updatedVendor: Vendor) => {
      const response = await fetch(`/api/vendors/${updatedVendor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVendor),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      setOpenDialog(false);
    },
  });

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'contact', label: 'Contact', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 170 },
    { id: 'address', label: 'Address', minWidth: 170 },
  ];

  const filteredVendors = vendors.filter((vendor: Vendor) =>
    Object.values(vendor).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (selectedVendor) {
      updateVendorMutation.mutate(selectedVendor);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Vendors
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
          data={filteredVendors}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogContent>
          {selectedVendor && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Name"
                fullWidth
                value={selectedVendor.name}
                onChange={(e) =>
                  setSelectedVendor({ ...selectedVendor, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Contact"
                fullWidth
                value={selectedVendor.contact || ''}
                onChange={(e) =>
                  setSelectedVendor({
                    ...selectedVendor,
                    contact: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                fullWidth
                value={selectedVendor.email || ''}
                onChange={(e) =>
                  setSelectedVendor({
                    ...selectedVendor,
                    email: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                fullWidth
                value={selectedVendor.phone || ''}
                onChange={(e) =>
                  setSelectedVendor({
                    ...selectedVendor,
                    phone: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                value={selectedVendor.address || ''}
                onChange={(e) =>
                  setSelectedVendor({
                    ...selectedVendor,
                    address: e.target.value,
                  })
                }
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