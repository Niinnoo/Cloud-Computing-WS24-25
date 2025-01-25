from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from .views import ProductView, CategoryView, inventory, place_order, OrderView

# the url in the webbrowser will be: *base address*/webshop/*url name*
urlpatterns =[
    path('inventory', inventory.InventoryView.as_view(), name='inventory'),
    path('place_order', place_order.place_order, name='place_order'),
    path('product/<int:id>', ProductView.ProductView.as_view(), name='product'),
    path('product', ProductView.ProductView.as_view(), name='product'),
    path('category', CategoryView.CategoryView.as_view(), name='category'),
    path('order/<int:id>', OrderView.OrderView.as_view(), name='order'),
    path('order', OrderView.OrderView.as_view(), name='order'),
] 
