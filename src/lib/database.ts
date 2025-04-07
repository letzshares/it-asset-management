import { supabase } from './supabase';
import {
  Asset,
  AssetHistory,
  Software,
  Vendor,
  PurchaseOrder,
  LicenseRenewal,
  IdCode,
  User,
} from '@/types/supabase';

// Asset operations
export const getAssets = async () => {
  const { data, error } = await supabase
    .from('Asset')
    .select('*');
  if (error) throw error;
  return data as Asset[];
};

export const getAssetById = async (id: number) => {
  const { data, error } = await supabase
    .from('Asset')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Asset;
};

// Purchase Order operations
export const getPurchaseOrders = async () => {
  const { data, error } = await supabase
    .from('PurchaseOrder')
    .select(`
      *,
      vendor:Vendor(*)
    `);
  if (error) throw error;
  return data as (PurchaseOrder & { vendor: Vendor })[];
};

export const updatePurchaseOrder = async (id: number, updates: Partial<PurchaseOrder>) => {
  const { data, error } = await supabase
    .from('PurchaseOrder')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      vendor:Vendor(*)
    `)
    .single();
  if (error) throw error;
  return data as PurchaseOrder & { vendor: Vendor };
};

// Vendor operations
export const getVendors = async () => {
  const { data, error } = await supabase
    .from('Vendor')
    .select('*');
  if (error) throw error;
  return data as Vendor[];
};

export const updateVendor = async (id: number, updates: Partial<Vendor>) => {
  const { data, error } = await supabase
    .from('Vendor')
    .update(updates)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Vendor;
};

// Software operations
export const getSoftware = async () => {
  const { data, error } = await supabase
    .from('Software')
    .select(`
      *,
      asset:Asset(*)
    `);
  if (error) throw error;
  return data as (Software & { asset: Asset })[];
};

export const updateSoftware = async (id: number, updates: Partial<Software>) => {
  const { data, error } = await supabase
    .from('Software')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      asset:Asset(*)
    `)
    .single();
  if (error) throw error;
  return data as Software & { asset: Asset };
};

// License Renewal operations
export const getLicenseRenewals = async () => {
  const { data, error } = await supabase
    .from('LicenseRenewal')
    .select(`
      *,
      software:Software(*)
    `);
  if (error) throw error;
  return data as (LicenseRenewal & { software: Software })[];
};

export const updateLicenseRenewal = async (id: number, updates: Partial<LicenseRenewal>) => {
  const { data, error } = await supabase
    .from('LicenseRenewal')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      software:Software(*)
    `)
    .single();
  if (error) throw error;
  return data as LicenseRenewal & { software: Software };
}; 