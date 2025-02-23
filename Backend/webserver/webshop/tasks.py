
from .stock_management.check_stock import check_stock
from .email_service.EmailService import EmailService
from .models import Order


def low_stock(threshold):
    data = check_stock(threshold)
    
    email_service = EmailService()
    email_service.send_stock_notice(data, 'bobdablina@gmail.com')
    

def update_order_status():
    status = ['PENDING', 'COMPLETED', 'CANCELED']
    
    updated_orders = [] 
    pending_orders = Order.objects.filter(status=status[0])

    for order in pending_orders:
        if order.status != status[1]: 
            order.status = status[1]  
            order.save()  
            updated_orders.append(order)  
    
    '''
    complete_orders = Order.objects.filter(status=status[1])
    complete_orders.update(status=status[2])
    updated_orders.extend(Order.objects.filter(status=status[2]))
    '''
    
    email_service = EmailService()
    
    for order in updated_orders:
        email_service.send_order_status_update(order)