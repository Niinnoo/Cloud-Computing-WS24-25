from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Product
from ..serializers import ProductSerializer
from ..macros import ProductFields



class InventoryView(APIView):
    def get(self, request):
        inventory = Product.objects.select_related(ProductFields.CATEGORY.value).all()
        serializer = ProductSerializer(inventory, many=True)
        return Response(serializer.data)