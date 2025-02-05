from rest_framework import serializers
from .models import Product, ProductCategory, Order, OrderItem
from .macros import ProductFields, ProductCategoryFields, OrderFields, OrderItemFields

class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(queryset=ProductCategory.objects.all(), source='category', write_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [ProductFields.ID.value,
                  ProductFields.NAME.value,
                  ProductFields.PRICE.value,
                  ProductFields.SHORT_DESCRIPTION.value,
                  ProductFields.LONG_DESCRIPTION.value,
                  ProductFields.CATEGORY_ID.value,
                  ProductFields.CATEGORY_NAME.value,
                  ProductFields.STOCK.value,
                  ProductFields.IMAGE.value]

    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = [ProductCategoryFields.ID.value, ProductCategoryFields.NAME.value]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields= [OrderFields.ID.value,
                 OrderFields.CUSTOMER_FIRSTNAME.value,
                 OrderFields.CUSTOMER_LASTNAME.value,
                 OrderFields.CUSTOMER_EMAIL.value,
                 OrderFields.CREATED_AT.value,
                 OrderFields.STATUS.value,
                 OrderFields.TOTAL_PRICE.value,
                 OrderFields.ORDER_DATE.value]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [OrderItemFields.ID.value,
                  OrderItemFields.ORDER_ID.value,
                  OrderItemFields.PRODUCT_ID.value,
                  OrderItemFields.QUANTITY.value,
                  OrderItemFields.UNIT_PRICE.value,
                  OrderItemFields.TOTAL_PRICE.value]




