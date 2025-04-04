'use client';

import React, { useState, ChangeEvent } from 'react';
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

interface PurchaseOrder {
  id: number;
  poNumber: string;
  requestor: string;
  vendorId: number;
  startDate: string;
  endDate: string;
  status: string;
  vendor: {
    id: number;
    name: string;
  };
}

export default function POTrackingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: purchaseOrders = [], isLoading } = useQuery<PurchaseOrder[]>({
    queryKey: ['purchaseOrders'],
    queryFn: async () => {
      const response = await fetch('/api/po-tracking');
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedPO: PurchaseOrder) => {
      const response = await fetch(`/api/po-tracking/${updatedPO.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPO),
      });
      return response.json();
    },
    onSuccess: () => {
      setOpenDialog(false);
    },
  });

  const filteredPOs = purchaseOrders.filter((po: PurchaseOrder) =>
    Object.values(po).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (selectedPO) {
      updateMutation.mutate(selectedPO);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTextFieldChange = (field: keyof PurchaseOrder) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedPO) {
      setSelectedPO({
        ...selectedPO,
        [field]: event.target.value,
      });
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Purchase Order Tracking
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PO Number</TableCell>
                <TableCell>Requestor</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPOs.map((po: PurchaseOrder) => (
                <TableRow key={po.id}>
                  <TableCell>{po.poNumber}</TableCell>
                  <TableCell>{po.requestor}</TableCell>
                  <TableCell>{po.vendor?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {format(new Date(po.startDate), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(po.endDate), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>{po.status}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(po)}
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
        <DialogTitle>Edit Purchase Order</DialogTitle>
        <DialogContent>
          {selectedPO && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="PO Number"
                fullWidth
                value={selectedPO.poNumber}
                onChange={handleTextFieldChange('poNumber')}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Requestor"
                fullWidth
                value={selectedPO.requestor}
                onChange={handleTextFieldChange('requestor')}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Status"
                fullWidth
                value={selectedPO.status}
                onChange={handleTextFieldChange('status')}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={selectedPO.startDate.split('T')[0]}
                onChange={handleTextFieldChange('startDate')}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={selectedPO.endDate.split('T')[0]}
                onChange={handleTextFieldChange('endDate')}
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