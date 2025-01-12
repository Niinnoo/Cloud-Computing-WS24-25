from django.db import models

class ProductCategories(models.Model):
    category = models.CharField(max_length=100, unique=True)

class ProductData(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    short_description = models.CharField(max_length=200)
    long_description = models.CharField(max_length=500)
    category = models.ForeignKey(ProductCategories, on_delete=models.CASCADE, related_name='products')


