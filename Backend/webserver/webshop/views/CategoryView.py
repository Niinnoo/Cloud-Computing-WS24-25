from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import ProductCategory
from ..serializers import CategorySerializer


class CategoryView(APIView):
    def get(self, request):
        categories = ProductCategory.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)