from rest_framework.response import Response
from .serializers import  RegisterationSerializers
from rest_framework import viewsets
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User



class RegisterationView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        serial = RegisterationSerializers(data=data)
        if serial.is_valid():
            password = serial.validated_data.get("password")
            serial.validated_data["password"] = make_password(password)
            serial.save()
            username = data.get("username")
            email = data.get("email")
            return Response(
                {"Account": "AccountCreated!"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
