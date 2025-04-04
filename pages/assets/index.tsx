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
import { useQuery } from '@tanstack/react-query';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import Layout from '../../components/Layout';
import { prisma } from '../../lib/prisma';

interface Asset {
  id: number;
  assetCategory: string;
  serialNumber: string;
  faCode: string;
  departmentName: string;
  location: string;
  status: string;
  assetRemarks: string | null;
  vendorName: string;
  make: string;
  modelNumber: string;
  gst: string;
  dateAcquired: string;
}

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await fetch('/api/assets');
      return response.json();
    },
  });

  const filteredAssets = assets.filter((asset: Asset) =>
    Object.values(asset).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Assets
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
                <TableCell>Asset Category</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>FA Code</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssets.map((asset: Asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.assetCategory}</TableCell>
                  <TableCell>{asset.serialNumber}</TableCell>
                  <TableCell>{asset.faCode}</TableCell>
                  <TableCell>{asset.departmentName}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.vendorName}</TableCell>
                  <TableCell>{asset.make}</TableCell>
                  <TableCell>{asset.modelNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewDetails(asset)}
                      color="primary"
                    >
                      <VisibilityIcon />
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Asset Details</DialogTitle>
        <DialogContent>
          {selectedAsset && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Typography>
                <strong>Asset Category:</strong> {selectedAsset.assetCategory}
              </Typography>
              <Typography>
                <strong>Serial Number:</strong> {selectedAsset.serialNumber}
              </Typography>
              <Typography>
                <strong>FA Code:</strong> {selectedAsset.faCode}
              </Typography>
              <Typography>
                <strong>Department:</strong> {selectedAsset.departmentName}
              </Typography>
              <Typography>
                <strong>Location:</strong> {selectedAsset.location}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedAsset.status}
              </Typography>
              <Typography>
                <strong>Remarks:</strong> {selectedAsset.assetRemarks || 'N/A'}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                Vendor Information
              </Typography>
              <Typography>
                <strong>Vendor Name:</strong> {selectedAsset.vendorName}
              </Typography>
              <Typography>
                <strong>Make:</strong> {selectedAsset.make}
              </Typography>
              <Typography>
                <strong>Model Number:</strong> {selectedAsset.modelNumber}
              </Typography>
              <Typography>
                <strong>GST:</strong> {selectedAsset.gst}
              </Typography>
              <Typography>
                <strong>Date Acquired:</strong>{' '}
                {new Date(selectedAsset.dateAcquired).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
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
import { useQuery } from '@tanstack/react-query';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import Layout from '../../components/Layout';
import { prisma } from '../../lib/prisma';

interface Asset {
  id: number;
  assetCategory: string;
  serialNumber: string;
  faCode: string;
  departmentName: string;
  location: string;
  status: string;
  assetRemarks: string | null;
  vendorName: string;
  make: string;
  modelNumber: string;
  gst: string;
  dateAcquired: string;
}

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await fetch('/api/assets');
      return response.json();
    },
  });

  const filteredAssets = assets.filter((asset: Asset) =>
    Object.values(asset).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Assets
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
                <TableCell>Asset Category</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>FA Code</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssets.map((asset: Asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.assetCategory}</TableCell>
                  <TableCell>{asset.serialNumber}</TableCell>
                  <TableCell>{asset.faCode}</TableCell>
                  <TableCell>{asset.departmentName}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.vendorName}</TableCell>
                  <TableCell>{asset.make}</TableCell>
                  <TableCell>{asset.modelNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewDetails(asset)}
                      color="primary"
                    >
                      <VisibilityIcon />
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Asset Details</DialogTitle>
        <DialogContent>
          {selectedAsset && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Typography>
                <strong>Asset Category:</strong> {selectedAsset.assetCategory}
              </Typography>
              <Typography>
                <strong>Serial Number:</strong> {selectedAsset.serialNumber}
              </Typography>
              <Typography>
                <strong>FA Code:</strong> {selectedAsset.faCode}
              </Typography>
              <Typography>
                <strong>Department:</strong> {selectedAsset.departmentName}
              </Typography>
              <Typography>
                <strong>Location:</strong> {selectedAsset.location}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedAsset.status}
              </Typography>
              <Typography>
                <strong>Remarks:</strong> {selectedAsset.assetRemarks || 'N/A'}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                Vendor Information
              </Typography>
              <Typography>
                <strong>Vendor Name:</strong> {selectedAsset.vendorName}
              </Typography>
              <Typography>
                <strong>Make:</strong> {selectedAsset.make}
              </Typography>
              <Typography>
                <strong>Model Number:</strong> {selectedAsset.modelNumber}
              </Typography>
              <Typography>
                <strong>GST:</strong> {selectedAsset.gst}
              </Typography>
              <Typography>
                <strong>Date Acquired:</strong>{' '}
                {new Date(selectedAsset.dateAcquired).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
} 