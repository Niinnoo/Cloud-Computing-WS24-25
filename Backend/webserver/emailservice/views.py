from django.core.mail import send_mail
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class SendEmailView(View):
    def post(self, request, *args, **kwargs):
        try:
            print(request.body)  # Debugging: Ausgabe des Anfrage-Bodys
            data = json.loads(request.body)
            subject = data.get('subject')
            print(subject)
            message = data.get('message')
            recipient_list = data.get('recipient_list')

            send_mail(
                subject,
                message,
                'e3833225@gmail.com',  # Absender
                recipient_list,
                fail_silently=False,
            )
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})