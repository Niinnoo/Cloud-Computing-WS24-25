import os 
from threading import Thread
from django.core.mail import send_mail
from ..macros import ProductFields

class EmailService(Thread):
    def __init__(self):
        super().__init__()
        
    def send_order_confirmation_email(self, order_data, customer_mail):
        subject = 'Order Confirmation'
        message = f"Thank you for your order, {order_data['customer_firstname']} {order_data['customer_lastname']}!"
        recipient_list = [order_data['customer_email']]
        
        send_mail(
            subject,
            message,
            os.getenv('EMAIL_HOST_USER'),  # Absender
            #recipient_list,
            [customer_mail],  # Empfänger
            fail_silently=False,
        )
    
    # email contains a "table" with product_id, name, remaining, stock 
    def send_stock_notice(self, product_info):
        
        
        subject = 'Low Stock'
        
        
        table_header = "<tr><th>Product ID</th><th>Name</th><th>Remaining Stock</th></tr>"
        table_rows = ""
        
        for product in product_info:
            table_rows += f"<tr><td>{product[ProductFields.ID.value]}</td><td>{product[ProductFields.NAME.value]}</td><td>{product[ProductFields.STOCK.value]}</td></tr>"
        
       
        message = f"""
        <html>
            <body>
                <p>Dear team,</p>
                <p>Please note the following products are running low on stock:</p>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>{table_header}</thead>
                    <tbody>{table_rows}</tbody>
                </table>
                <p>Best regards,</p>
                <p>Your Email Service</p>
            </body>
        </html>
        """
        
        send_mail(
            subject,
            message,
            os.getenv('EMAIL_HOST_USER'),  # Absender
            #recipient_list,
            ['nino.zoric@yahoo.de'],  # Empfänger
            fail_silently=False,
        )
        
    
        
        