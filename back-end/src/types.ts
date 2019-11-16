export interface Database {
    receipts: string[],
    product_history: ProductHistory,
    fridge: FridgeItem[],
}

export interface ProductHistory {
    [ean: string]: ProductHistory[],
}
export interface PurchaseHistory {
    purchase_date: string,
    quantity: number,
}

export interface FridgeItem extends ProductAPI {
    id: string,
}

export interface Store {
    id: string,
}

export interface Availability {
    stores: Store[],
}

export interface ProductAPI {
    name: string,
    ean: string,
    purchase_date: string,
}

export interface Product extends ProductAPI {
    quantity: number,
}

export interface ProductsData {
    [key: string]: Product,
}

export interface FridgePostBody {
    products: Product[],
}
