import random
from django.core.management.base import BaseCommand
from webshop.models import ProductCategory, Product
from django.core.files.base import ContentFile
from io import BytesIO
import requests

class Command(BaseCommand):
    help = "Populate the database with 5 categories and 15 products (books)."

    def handle(self, *args, **kwargs):
        # Categories
        categories = [
            "Fiction",
            "Science",
            "Biography",
            "Technology",
            "History"
        ]

        # Create categories
        category_objects = []
        for category_name in categories:
            category, created = ProductCategory.objects.get_or_create(name=category_name)
            category_objects.append(category)

        # Product details
        books = [
            {
                "name": "To Kill a Mockingbird",
                "price": 9.99,
                "short_description": "A novel about justice in the Deep South.",
                "long_description": "Harper Lee's classic novel explores racism and justice in a small Southern town.",
                "category": category_objects[0],
                "stock": 10,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "Sapiens: A Brief History of Humankind",
                "price": 14.99,
                "short_description": "A journey through human history.",
                "long_description": "Yuval Noah Harari explores how humans evolved and shaped the world.",
                "category": category_objects[1],
                "stock": 12,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "Steve Jobs",
                "price": 19.99,
                "short_description": "The biography of Apple co-founder Steve Jobs.",
                "long_description": "Walter Isaacson's comprehensive biography of Steve Jobs, detailing his life and legacy.",
                "category": category_objects[2],
                "stock": 8,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "Clean Code: A Handbook of Agile Software Craftsmanship",
                "price": 34.99,
                "short_description": "Learn best practices for writing clean code.",
                "long_description": "Robert C. Martin provides principles and practices to write clean, maintainable code.",
                "category": category_objects[3],
                "stock": 15,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "The Wright Brothers",
                "price": 11.99,
                "short_description": "A story of the Wright brothers and their invention of the airplane.",
                "long_description": "David McCullough tells the inspiring story of the Wright brothers.",
                "category": category_objects[4],
                "stock": 7,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "1984",
                "price": 8.99,
                "short_description": "A dystopian novel about a totalitarian regime.",
                "long_description": "George Orwell's classic novel that explores surveillance, censorship, and individuality.",
                "category": category_objects[0],
                "stock": 10,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "Astrophysics for People in a Hurry",
                "price": 12.99,
                "short_description": "A concise introduction to astrophysics.",
                "long_description": "Neil deGrasse Tyson explains the universe in a way anyone can understand.",
                "category": category_objects[1],
                "stock": 13,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "The Diary of a Young Girl",
                "price": 10.99,
                "short_description": "The diary of Anne Frank during the Holocaust.",
                "long_description": "Anne Frank's powerful diary, a testament to the human spirit.",
                "category": category_objects[2],
                "stock": 9,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "Python Crash Course",
                "price": 29.99,
                "short_description": "A beginner's guide to Python programming.",
                "long_description": "Eric Matthes introduces Python programming with hands-on projects.",
                "category": category_objects[3],
                "stock": 20,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "The Guns of August",
                "price": 14.99,
                "short_description": "An account of the outbreak of World War I.",
                "long_description": "Barbara W. Tuchman chronicles the events leading to World War I.",
                "category": category_objects[4],
                "stock": 6,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "The Great Gatsby",
                "price": 7.99,
                "short_description": "A novel about wealth and love in the 1920s.",
                "long_description": "F. Scott Fitzgerald's masterpiece set in the Jazz Age.",
                "category": category_objects[0],
                "stock": 12,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "A Brief History of Time",
                "price": 18.99,
                "short_description": "An exploration of the universe's mysteries.",
                "long_description": "Stephen Hawking examines the nature of time and space.",
                "category": category_objects[1],
                "stock": 8,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "Becoming",
                "price": 16.99,
                "short_description": "The memoir of Michelle Obama.",
                "long_description": "Michelle Obama's inspiring story of her journey to the White House.",
                "category": category_objects[2],
                "stock": 10,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "Introduction to Algorithms",
                "price": 39.99,
                "short_description": "A comprehensive guide to algorithms.",
                "long_description": "Thomas H. Cormen and others provide a detailed look at algorithms and their applications.",
                "category": category_objects[3],
                "stock": 5,
                "image_url": 'product_images/default.jpg'
            },
            {
                "name": "The Rise and Fall of the Third Reich",
                "price": 22.99,
                "short_description": "A history of Nazi Germany.",
                "long_description": "William L. Shirer chronicles the events of Nazi Germany.",
                "category": category_objects[4],
                "stock": 7,
                "image_url": 'product_images/default.jpg'
            },
        ]

        # Populate products
        for book in books:
            product, created = Product.objects.get_or_create(
                name=book["name"],
                defaults={
                    "price": book["price"],
                    "short_description": book["short_description"],
                    "long_description": book["long_description"],
                    "category": book["category"],
                    "stock": book["stock"],
                },
            )

        self.stdout.write(self.style.SUCCESS("Database successfully populated with categories and 15 products!"))
