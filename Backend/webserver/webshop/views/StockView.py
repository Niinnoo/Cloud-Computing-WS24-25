from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..stock_management.check_stock import check_stock


class StockView(APIView):
    
    '''
    This GET method will return a json containing a list of products with low stock
    The request should look like:
    {
        "threshold" : 10,
    }
    '''
    def get(self, request):
        low_stock = check_stock(request.data.get('threshold'))
        
        return Response(low_stock)