from django.db.models import fields
from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from django.contrib.auth.models import User
from .models import Profile, Follow


class ProfileFollowSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "user",
            "name",
            "bio",
            "birth_date",
            "location",
            "profile_pic",
        ]
class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
        
        
class FollowersSerializer(serializers.ModelSerializer):
    user_id  = ProfileFollowSerializers(read_only=True )
    class Meta:
        model = Follow
        fields = ['user_id' ]

class FollowingsSerializer(serializers.ModelSerializer):
    following_user_id = ProfileFollowSerializers(read_only=True )
    class Meta:
        model = Follow
        fields = ['following_user_id']

class ProfileSerializers(serializers.ModelSerializer):
    followingss = FollowingsSerializer(many=True, read_only=True)
    followerss = FollowersSerializer(many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            "user",
            "name",
            "bio",
            "birth_date",
            "location",
            "followingss",
            "followerss",
            "profile_pic",
            "cover_pic"
            
            
        ]


class ProfilePostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = [
            "user",
            "profile_pic",
            "name",
        ]


# **Comment Serializer**
class CommentSerializer(serializers.ModelSerializer):
    profile = ProfilePostSerializer(required=False, read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"


# **Posts Serializer**
class PostSerializer(serializers.ModelSerializer):
    profile = ProfilePostSerializer(required=False, read_only=True)
    comment = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ["created_at"]
        
        
class UserPostSerializer(serializers.ModelSerializer):
    profile = ProfileSerializers(required=False, read_only=True)
    comment = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ["created_at"]