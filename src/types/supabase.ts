export type Asset = {
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
  createdAt: string;
  updatedAt: string;
};

export type AssetHistory = {
  id: number;
  assetId: number;
  modifiedDate: string;
  userId: string;
  status: string;
  modifiedBy: string;
  lastVisited: string;
};

export type Software = {
  id: number;
  name: string;
  version: string;
  licenseKey: string | null;
  expiryDate: string | null;
  assetId: number;
};

export type Vendor = {
  id: number;
  name: string;
  contact: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseOrder = {
  id: number;
  poNumber: string;
  requestor: string;
  vendorId: number;
  startDate: string;
  endDate: string;
  status: string;
};

export type LicenseRenewal = {
  id: number;
  softwareId: number;
  expiryDate: string;
  status: string;
};

export type IdCode = {
  id: number;
  code: string;
  description: string | null;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}; 