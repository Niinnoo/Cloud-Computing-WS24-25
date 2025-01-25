from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from enum import Enum
from ..models import Order, OrderItem
from ..serializers import OrderSerializer, OrderItemSerializer

class OrderData(Enum):
    ORDER = 'order'
    ORDER_ITEMS = 'order_items'

class OrderView(APIView):

    def get(self, request, id):
        order = get_object_or_404(Order, id=id)
        order_serializer = OrderSerializer(order)
        order_items = OrderItem.objects.filter(order_id=id)
        order_items_serializer = OrderItemSerializer(order_items, many=True)
        
        response = {
                'order' : order_serializer.data,
                'order_items' : order_items_serializer.data
                }
        
        return Response(response)

    def post(self, request):
        order_serializer = OrderSerializer(data=request.data.get(OrderData.ORDER.value))
        

        if order_serializer.is_valid():
            
            order_serializer.save()
            
            order_items = request.data.get(OrderData.ORDER_ITEMS.value)
            print(order_items)
            
            for item in order_items:
                item_serializer = OrderItemSerializer(data=item)
                
                if item_serializer.is_valid():
                    item_serializer.save()
                    
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)

        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        