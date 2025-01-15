from django.urls import path

from .views import ProductView, inventory, place_order, order_status

# the url in the webbrowser will be: *base address*/webshop/*url name*
urlpatterns =[
    path('inventory', inventory.InventoryView.as_view(), name='inventory'),
    path('place_order', place_order.place_order, name='place_order'),
    path('product/<int:id>', ProductView.ProductView.as_view(), name='product'),
    path('product', ProductView.ProductView.as_view(), name='product'),
]