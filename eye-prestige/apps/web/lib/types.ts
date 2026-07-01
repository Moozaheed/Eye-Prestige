export type Shape = string;

export type CategoryKey = string;

export interface Category {
  key: CategoryKey;
  name: string;
  image: string;
  nameBn?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  shape: Shape;
  category: CategoryKey;
  images: string[];
  description?: string;
  prescriptionRequired: boolean;
  featured: boolean;
  stock: number;
  disabled?: boolean;
}

export interface SelectedLens {
  category: "none" | "non-power" | "power";
  typeId?: string;
  typeName?: string;
  typeNameBn?: string;
  price: number;
}

export interface PrescriptionDetails {
  mode: "upload" | "manual" | "later";
  values?: {
    right: { sph: string; cyl: string; axis: string };
    left: { sph: string; cyl: string; axis: string };
    pd: string;
  };
  imageFileName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedLens?: SelectedLens;
  prescription?: PrescriptionDetails;
}

export type PaymentMethod = "COD" | "BKASH" | "NAGAD" | "SSLCOMMERZ";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface ShippingAddress {
  name: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  address: string;
  postalCode?: string;
}
