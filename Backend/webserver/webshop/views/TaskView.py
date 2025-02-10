from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..tasks import low_stock, update_order_status


#This view will be used to implement a GET-method which will be periodically be called by an aws lambda function
class TaskView(APIView):
    def get(self, request):
        low_stock(10) # checks inventory for products with quantity below 10 and sends an email to notify the shop owner 
        update_order_status() # simulates activity of delivery by setting all products to the next step
        
        return Response(status=status.HTTP_200_OK)