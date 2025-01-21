from django.core.management.base import BaseCommand
from webshop.models import Product, ProductCategory

class Command(BaseCommand):
    help = 'Löscht alle Produkte aus der Datenbank'

    def handle(self, *args, **kwargs):
        Product.objects.all().delete()
        ProductCategory.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Alle Produkte wurden erfolgreich gelöscht'))