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

interface PurchaseOrder {
  id: number;
  poNumber: string;
  requestor: string;
  vendorId: number;
  startDate: string;
  endDate: string;
  status: string;
  vendor: {
    name: string;
  };
}

export default function POTracking() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const queryClient = useQueryClient();

  const { data: purchaseOrders = [], isLoading } = useQuery({
    queryKey: ['purchaseOrders'],
    queryFn: async () => {
      const response = await fetch('/api/po-tracking');
      return response.json();
    },
  });

  const updatePOMutation = useMutation({
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
      queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] });
      setOpenDialog(false);
    },
  });

  const columns = [
    { id: 'poNumber', label: 'PO Number', minWidth: 170 },
    { id: 'requestor', label: 'Requestor', minWidth: 170 },
    { id: 'vendor', label: 'Vendor', minWidth: 170 },
    { id: 'startDate', label: 'Start Date', minWidth: 170 },
    { id: 'endDate', label: 'End Date', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
  ];

  const filteredPOs = purchaseOrders.filter((po: PurchaseOrder) =>
    Object.values(po).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formattedPOs = filteredPOs.map((po: PurchaseOrder) => ({
    ...po,
    vendor: po.vendor.name,
    startDate: format(new Date(po.startDate), 'yyyy-MM-dd'),
    endDate: format(new Date(po.endDate), 'yyyy-MM-dd'),
  }));

  const handleEdit = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (selectedPO) {
      updatePOMutation.mutate(selectedPO);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          PO Tracking
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
          data={formattedPOs}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Purchase Order</DialogTitle>
        <DialogContent>
          {selectedPO && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="PO Number"
                fullWidth
                value={selectedPO.poNumber}
                onChange={(e) =>
                  setSelectedPO({ ...selectedPO, poNumber: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                label="Requestor"
                fullWidth
                value={selectedPO.requestor}
                onChange={(e) =>
                  setSelectedPO({ ...selectedPO, requestor: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedPO.status}
                  onChange={(e) =>
                    setSelectedPO({ ...selectedPO, status: e.target.value })
                  }
                  label="Status"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={selectedPO.startDate.split('T')[0]}
                onChange={(e) =>
                  setSelectedPO({
                    ...selectedPO,
                    startDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={selectedPO.endDate.split('T')[0]}
                onChange={(e) =>
                  setSelectedPO({
                    ...selectedPO,
                    endDate: e.target.value,
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