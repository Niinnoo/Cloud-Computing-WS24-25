
from .stock_management.check_stock import check_stock
from .email_service.EmailService import EmailService
from .models import Order


def low_stock(threshold):
    data = check_stock(threshold)
    
    email_service = EmailService()
    email_service.send_stock_notice(data, 'bobdablina@gmail.com')
    

def update_order_status():
    status = ['pending', 'completed', 'canceled']
    
    updated_orders = []
    pending_orders = Order.objects.filter(status=status[0])
    pending_orders.update(status=status[1])
    updated_orders.extend(pending_orders)
    
    complete_orders = Order.objects.filter(status=status[1])
    complete_orders.update(status=status[0])
    updated_orders.extend(complete_orders)
    
    email_service = EmailService()
    
    for order in updated_orders:
        email_service.send_order_status_update(order)