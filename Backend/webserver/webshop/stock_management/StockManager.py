from ..models import Product


class StockManager:
    def __init__(self, orders):
        self.orders = orders
    
    def decrease_stock(product_id, order_qty):
        
        try:
            product = Product.objects.get(id=product_id)
            available_stock = product.stock
            new_stock = available_stock - order_qty
            
            if new_stock >= 0:
                product.stock = new_stock
                product.save
                
        except Exception as e:
            print(e)
            
            