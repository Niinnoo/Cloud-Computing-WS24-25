from rest_framework.views import APIView
from django.urls import path
from rest_framework.response import Response

class HealthCheckView(APIView):

    def get(self, request):
        response = {"status" : 'ok'}
        return Response(response, status=200)