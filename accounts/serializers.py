from rest_framework import serializers
from .models import CustomUser


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "phone_number",
            "date_of_birth",
            "gender",
            "city",
            "state",
            "country",
        ]


class RegisterSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "confirm_password",
            "phone_number",
            "date_of_birth",
            "gender",
            "city",
            "state",
            "country",
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

        if CustomUser.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
                {"email": "Email already exists."}
            )

        if CustomUser.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError(
                {"username": "Username already exists."}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone_number=validated_data["phone_number"],
            date_of_birth=validated_data["date_of_birth"],
            gender=validated_data["gender"],
            city=validated_data["city"],
            state=validated_data["state"],
            country=validated_data["country"],
        )

        return user