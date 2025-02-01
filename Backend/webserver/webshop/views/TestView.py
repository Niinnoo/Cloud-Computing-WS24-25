from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..stock_management.check_stock import check_stock

class TestView(APIView):
    
    def get(self, request):
        check_stock()
        
        return Response(status=status.HTTP_302_FOUND)
        