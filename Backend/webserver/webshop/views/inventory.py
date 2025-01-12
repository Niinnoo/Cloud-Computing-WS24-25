from django.http import JsonResponse
from ..models import Product


def inventory(request):
    if request.method == 'GET':
        products = Product.objects.select_related('category').all()

        inventory = [
            {
                'name' : product.name,
                'category' : product.category.name,
                'price' : f'{product.price}€',
                'short_description' : product.short_description,
                'long_description' : product.long_description
            }
            for product in products
        ]


        return JsonResponse({'success': True, 'inventory_list' : inventory})

    else:
        return JsonResponse({'success': False, 'error' : 'Invalid Request'})