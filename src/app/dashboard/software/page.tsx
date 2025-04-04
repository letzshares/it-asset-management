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
import { format } from 'date-fns';

interface Software {
  id: number;
  name: string;
  version: string;
  licenseKey: string;
  expiryDate: string;
  assetId: number;
  asset: {
    id: number;
    serialNumber: string;
  };
}

export default function SoftwarePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: software = [], isLoading } = useQuery({
    queryKey: ['software'],
    queryFn: async () => {
      const response = await fetch('/api/software');
      return response.json();
    },
  });

  const updateMutation = useMutation({
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
      setOpenDialog(false);
    },
  });

  const filteredSoftware = software.filter((item: Software) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (software: Software) => {
    setSelectedSoftware(software);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (selectedSoftware) {
      updateMutation.mutate(selectedSoftware);
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>License Key</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Asset</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSoftware.map((item: Software) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.licenseKey}</TableCell>
                  <TableCell>
                    {format(new Date(item.expiryDate), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>{item.asset?.serialNumber || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(item)}
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
        <DialogTitle>Edit Software</DialogTitle>
        <DialogContent>
          {selectedSoftware && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Name"
                fullWidth
                value={selectedSoftware.name}
                onChange={(e) =>
                  setSelectedSoftware({
                    ...selectedSoftware,
                    name: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Version"
                fullWidth
                value={selectedSoftware.version}
                onChange={(e) =>
                  setSelectedSoftware({
                    ...selectedSoftware,
                    version: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="License Key"
                fullWidth
                value={selectedSoftware.licenseKey}
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
                value={selectedSoftware.expiryDate.split('T')[0]}
                onChange={(e) =>
                  setSelectedSoftware({
                    ...selectedSoftware,
                    expiryDate: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
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