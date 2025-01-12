from django.http import JsonResponse


def place_order(request):
    if request.method == 'PUT':
        try:
            # here the order will be stored in the data base
            JsonResponse({'success' : True})
        except Exception as e:
            JsonResponse({'success' : True, 'error' : e})

    else:
        return JsonResponse({'success': False, 'error' : 'Invalid Request'})