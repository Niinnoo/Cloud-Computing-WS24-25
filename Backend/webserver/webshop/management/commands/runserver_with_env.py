import os
from django.core.management.commands.runserver import Command as RunserverCommand

class Command(RunserverCommand):
    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument('email', type=str, help='E-Mail address from which the mails are sent')
        parser.add_argument('password', type=str, help='Application Password from Gmail')

    def handle(self, *args, **options):
        os.environ['EMAIL_HOST_USER'] = options['email']
        os.environ['EMAIL_HOST_PASSWORD'] = options['password']
        super().handle(*args, **options)
