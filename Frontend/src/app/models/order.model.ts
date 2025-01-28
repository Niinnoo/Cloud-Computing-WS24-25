export interface OrderResponse {
  order: {
    id: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    status: string;
    total_price: number;
    order_date: string;
  };
  order_items: Array<{
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

export interface Order {
  order: {
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    total_price: number;
  };
  order_items: Array<{
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}