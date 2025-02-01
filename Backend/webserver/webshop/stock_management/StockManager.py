from ..models import Product
from ..macros import OrderItemFields

class StockManager:
    def __init__(self, order_items):
        self.order_items = order_items
    
    def decrease_stock(self, product_id, order_qty):
        
        try:
            product = Product.objects.get(id=product_id)
            available_stock = product.stock
            new_stock = available_stock - order_qty
            
            if new_stock >= 0:
                product.stock = new_stock
                product.save()
                
        except Exception as e:
            print(e)
            
    def decrease_stock_multiple_items(self):
        
        for order in self.order_items:
            try:
                self.decrease_stock(order[OrderItemFields.PRODUCT_ID.value], order[OrderItemFields.QUANTITY.value])
            
            except Exception as e:
                print('Stock change not possible error: ' + str(e))
            
            