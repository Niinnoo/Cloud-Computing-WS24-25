import os 
from threading import Thread
from django.core.mail import send_mail, EmailMessage
from ..macros import ProductFields, OrderFields, OrderItemFields
from .table_generation import generate_table_header, generate_table_row


TRACKING_LINK = 'http://localhost:4200/order-tracking'



class EmailService(Thread):
    def __init__(self):
        super().__init__()
        
    def send_order_confirmation_email(self, order_data, order_items):
        subject = 'Order Confirmation'

        # Extract customer details
        customer_name = order_data[OrderFields.CUSTOMER_FIRSTNAME.value] + order_data[OrderFields.CUSTOMER_LASTNAME.value]
        customer_email = order_data[OrderFields.CUSTOMER_EMAIL.value]

        order_sum = order_data[OrderFields.TOTAL_PRICE.value] + '€'

        # Create table content
        table_rows = ''
        for order_item in order_items:
            values = [order_item[OrderItemFields.PRODUCT_ID.value], order_item[OrderItemFields.QUANTITY.value], order_item[OrderItemFields.UNIT_PRICE.value], order_item[OrderItemFields.TOTAL_PRICE.value]]
            units = ['', '', '€', '€']
            table_rows += generate_table_row(values, units)
        
        header_names = ['Name', 'Quantity', 'Unit Price', 'Total Price']
        table_header = generate_table_header(header_names)
        
            
        

        # HTML email template
        html_message = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Thank you for your order, {customer_name}!</h2>
                <p>Your order has been placed successfully. Below are the details:</p>
                
                <h3>Order Summary</h3>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    {table_header}
                    {table_rows}
                    <tr>
                        <td colspan="3" style="border: 1px solid #ddd; padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                        <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">{order_sum} €</td>
                    </tr>
                </table>
                
                <p>You can track your order status <a href="{TRACKING_LINK}" target="_blank">here</a>.</p>

                <p>Kind regards,<br><strong>Your Book Store</strong></p>
            </body>
        </html>
        """

        # Send email
        email = EmailMessage(
            subject=subject,
            body=html_message,
            from_email=os.getenv('EMAIL_HOST_USER'),
            to=[customer_email]
        )
        email.content_subtype = "html"
        email.send(fail_silently=False)



    
    # email contains a "table" with product_id, name, remaining, stock 
    def send_stock_notice(self, product_info, email):
        
        subject = 'Low Stock'
        table_header = generate_table_header(['ID', 'Name', 'Stock'])
        table_rows = ""
        
        for product in product_info:
            values = [product[ProductFields.ID.value], product[ProductFields.NAME.value], product[ProductFields.STOCK.value]]
            units = ['', '', '']
            table_rows += generate_table_row(values, units)
        
        
       
        message = f"""
        <html>
            <body>
                <h3>Low Stock Notice</h3>
                <p>Dear team,</p>
                <p>Please note the following products are running low on stock:</p>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>{table_header}</thead>
                    <tbody>{table_rows}</tbody>
                </table>
            </body>
        </html>
        """
        
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=os.getenv('EMAIL_HOST_USER'),
            to=[email]
        )
        email.content_subtype = "html"
        email.send(fail_silently=False)
        
        
    def send_order_status_update(self, order_data):
        customer_email = order_data[OrderFields.CUSTOMER_EMAIL.value]
        customer_name = order_data[OrderFields.CUSTOMER_FIRSTNAME.value] + order_data[OrderFields.CUSTOMER_LASTNAME.value]
        order_status = order_data[OrderFields.STATUS.value]
        order_id = order_data[OrderFields.ID.value]
        subject = f'New order status: {order_status}'
        
        message= f"""
        <html>
            <h3>Order status update</h3>
            <p>
            Dear {customer_name},</br>
            the status for your order {order_id} has been updated.</br>
            The new status: {order_status}
            </p>
            <p>You can track your order status <a href="{TRACKING_LINK}" target="_blank">here</a>.</p>
            
            <p>Kind regards,<br><strong>Your Book Store</strong></p>
        </html>
        """
        # Send email
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=os.getenv('EMAIL_HOST_USER'),
            to=[customer_email]
        )
        email.content_subtype = "html"
        email.send(fail_silently=False)
    
        
        