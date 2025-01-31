import os 
from threading import Thread
from django.core.mail import send_mail

class EmailService(Thread):
    def __init__(self, order_data):
        self.order_data = order_data
        
    def send_order_confirmation_email(self):
        subject = 'Order Confirmation'
        message = f"Thank you for your order, {self.order_data['customer_firstname']} {self.order_data['customer_lastname']}!"
        recipient_list = [self.order_data['customer_email']]
        
        send_mail(
            subject,
            message,
            os.getenv('EMAIL_HOST_USER'),  # Absender
            #recipient_list,
            ['nino.zoric@yahoo.de'],  # Empfänger
            fail_silently=False,
        )
        
    def start(self):
        self.send_order_confirmation_email()
        