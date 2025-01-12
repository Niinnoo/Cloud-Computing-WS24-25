from django.http import JsonResponse

# This request will provide the status for a given order
def order_status(request):
    if request.method == 'GET':
        return JsonResponse({'success': True, 'status': 'Order is on the way'})
    else:
        return JsonResponse({'success': False, 'error' : 'Invalid Request'})