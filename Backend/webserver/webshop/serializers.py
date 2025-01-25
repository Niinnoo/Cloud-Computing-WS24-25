from rest_framework import serializers
from .models import Product, ProductCategory, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(queryset=ProductCategory.objects.all(), source='category', write_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'short_description', 'long_description', 'category_id', 'category_name', 'stock', 'image']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields= ['id', 'customer_firstname', 'customer_lastname', 'customer_email', 'created_at', 'status', 'total_price', 'order_date']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order_id', 'product_id', 'quantity', 'unit_price', 'total_price']




