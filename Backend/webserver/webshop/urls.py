from django.urls import path

from .views import inventory, place_order, order_status

urlpatterns =[
    path('inventory', inventory.inventory, name='inventory'),
    path('place_order', place_order.place_order, name='place_order'),
    path('order_status', inventory.inventory, name='inventory')
]