from django.db import models

class ProductCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    short_description = models.CharField(max_length=200)
    long_description = models.CharField(max_length=500)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='products')
    stock = models.IntegerField()
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return self.name


