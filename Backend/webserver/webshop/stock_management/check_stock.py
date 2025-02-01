from ..models import Product
from ..macros import ProductFields
from ..email_service.EmailService import EmailService


STOCK_THRESHOLD = 10


def check_stock():
    low_stock_products = Product.objects.filter(stock__lte=STOCK_THRESHOLD)
    
    product_info = [] # list will contains a dict for each product containing the id, name an remaining stock for the email
    
    
    for product in low_stock_products:
        temp_info = {
            ProductFields.ID.value : product.id,
            ProductFields.NAME.value : product.name,
            ProductFields.STOCK.value : product.stock
        }
        product_info.append(temp_info)
        
    print(product_info)
    
    email_service = EmailService()
    email_service.send_stock_notice(product_info)
