from rest_framework import serializers
from django.contrib.auth.models import User


# **Registertaion and login Serializer**
class RegisterationSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
        ]

    # field validator  email must not exists beforhand
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that Email already exists.")
        return value

    # field validator username must not exists beforehand
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "A user with that username already exists."
            )
        return value
