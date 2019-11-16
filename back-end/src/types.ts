export interface Database {
  receipts: string[];
  product_history: ProductHistory;
  fridge: FridgeItem[];
}

export interface ProductHistory {
  [ean: string]: ProductPurchaseHistory;
}

export interface FridgeItem {
  id: string;
  name: string;
  ean: string;
  purchase_date: string;
  expired_date: string;
  suggestedExpDate: boolean;
}

export interface Store {
  id: string;
}

export interface Availability {
  stores: Store[];
}

export interface ProductAPI {
  name: string;
  ean: string;
}

export interface Product extends ProductAPI {
  quantity: number;
  purchase_date: string;
  expired_date?: string;
  suggestedExpDate?: boolean;
}

export interface ProductPurchaseHistoryDetail {
  quantity: number;
  purchase_date: string;
}

export interface ProductPurchaseHistory extends ProductAPI {
  history: ProductPurchaseHistoryDetail[];
}

export interface ProductsData {
  [key: string]: ProductAPI;
}

export interface FridgePostBody {
  products: Product[];
}

export interface FridgePatchBody {
  expired_date: string;
  suggestedExpDate: boolean;
}

export interface PurchaseHistory {
  [day: string]: Product;
}
