# Generated by Django 4.2.17 on 2025-02-11 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webshop', '0012_remove_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
