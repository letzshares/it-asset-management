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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Edit as EditIcon } from '@mui/icons-material';
import Layout from '@/components/layout/Layout';

interface Vendor {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
}

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const response = await fetch('/api/vendors');
      return response.json();
    },
  });

  const updateMutation = useMutation({
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
      setOpenDialog(false);
    },
  });

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
      updateMutation.mutate(selectedVendor);
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVendors.map((vendor: Vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.address}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(vendor)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogContent>
          {selectedVendor && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Name"
                fullWidth
                value={selectedVendor.name}
                onChange={(e) =>
                  setSelectedVendor({
                    ...selectedVendor,
                    name: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Contact"
                fullWidth
                value={selectedVendor.contact}
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
                value={selectedVendor.email}
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
                value={selectedVendor.phone}
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
                value={selectedVendor.address}
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