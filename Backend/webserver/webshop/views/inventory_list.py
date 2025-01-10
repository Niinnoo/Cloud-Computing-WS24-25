from django.http import JsonResponse


def inventory_list(request):
    if request.method == 'GET':
        inventory = [{'id': 1,
                     'name': 'Toaster',
                     'price' : 19.99},
                     {'id': 2,
                     'name': 'Ball',
                     'price' : 9.99}]

        return JsonResponse({'success': True, 'inventory_list' : inventory})

    else:
        return JsonResponse({'success': False, 'error' : 'Invalid Request'})