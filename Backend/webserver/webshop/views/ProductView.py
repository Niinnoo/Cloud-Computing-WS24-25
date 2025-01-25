from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Product
from ..serializers import ProductSerializer


class ProductView(APIView):
    # This GET request will return a json which contains the information of a single product with given id
    # Example request: http://localhost:8000/webshop/product/1
    def get(self, request, id):
        product = get_object_or_404(Product,id = id) # if a product with the given id does not exist in the db an error 404 is returned
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    # This POST is for partially  modifying product information
    # The request needs to contain a json string of the following structure:
    '''
    {
    "price": "149.99",
    "long_description": "High-quality headphones supporting Bluetooth",
    "stock": 230
    }
    '''
    # only the attributes that are changed need to be contained in the json string
    # Example request: http://localhost:8000/webshop/product/1
    def patch(self, request, id):
        product = get_object_or_404(Product, id=id)
        serializer = ProductSerializer(product, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE request to delete a product from the database
    # Example request: http://localhost:8000/webshop/product/1
    def delete(self, request, id):
        product = get_object_or_404(Product, id=id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # POST request to create new product
    # request needs to contain json string with all information about the new product
    # Example request: http://localhost:8000/webshop/product
    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)