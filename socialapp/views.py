from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile, Follow 
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Comment, Post , Profile , Follow
from .serializers import CommentSerializer, PostSerializer, FollowerSerializer, ProfileSerializers , UserPostSerializer
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser , FormParser



class PostingView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser , FormParser ]

    # # *uncomment me
    def list(self, request):
        follows = Follow.objects.filter(user_id=request.user.id).values_list(
            "following_user_id", flat=True
        )
        users = User.objects.filter(id__in = follows)
        profile = Profile.objects.filter(user__in = users )
        posts = Post.objects.filter(profile__in=profile)

        serial = PostSerializer(posts, many=True)
        return Response(serial.data)

    def create(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        serial = PostSerializer(data=request.data)
        if serial.is_valid():
            serial.save(profile=profile)
            return Response(
                {"Post": "PostCreatedSuccefully!"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk):
        post = Post.objects.get(id=pk)
        serial = self.serializer_class(post, data=request.data,partial=True)

        if serial.is_valid():
            serial.save()
            return Response(
                {"Post": "UpdatedSuccessfully!"}, status=status.HTTP_202_ACCEPTED
            )

        return Response(serial.errors, status=status.HTTP_304_NOT_MODIFIED)
   


class CommentsView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permission_classes = [IsAuthenticated]

    def create(self, request):
        user = self.request.user
        # remove below 2 lines if problems in comments
        postid = request.data.get('post')
        post = Post.objects.get(id = postid)
        profile = Profile.objects.get(user=user)
        serial = self.serializer_class(data=request.data)
        if serial.is_valid():
            serial.save(profile = profile , post = post)
            return Response(
                {"Comment": "CommentedSuccefully!"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        commentobj = Comment.objects.get(id=pk)
        serial = CommentSerializer(commentobj, data=request.data )

        if serial.is_valid():
            serial.save()
            return Response(
                {"Comment": "UpdatedSuccessfully!"}, status=status.HTTP_202_ACCEPTED
            )

        return Response(serial.errors, status=status.HTTP_304_NOT_MODIFIED)
    


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        
          #*Only fetching posts that are done by user  
class UserPostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = UserPostSerializer
    # permission_classes = [IsAuthenticated]
  
    def list(self, request):
        user  = self.request.user
        profile = Profile.objects.get(user = user)
        posts = Post.objects.filter(profile=profile)
        serial = PostSerializer(posts, many=True)
        return Response(serial.data)
    
    def retrieve(self,request ,pk, *args, **kwargs):
        profile = Profile.objects.get(slug = pk)
        posts = Post.objects.filter(profile=profile)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    
     
    def destroy(self, request,pk, *args, **kwargs):
        post = Post.objects.get(id=pk)
        post.delete()
        return  Response ({post : 'PostDeletedSuccessfully!'})
        


class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializers
    # permission_classes = [IsAuthenticated]

    # *only shows user his own profile
    def list(self, request, *args, **kwargs):
        user = self.request.user
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializers(profile)
        return Response(serializer.data)

    def partial_update(self, request, pk, *args, **kwargs):
        profile = Profile.objects.get(slug=pk)
        serializer = ProfileSerializers(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Update": "UploadSuccessful!"}, status=status.HTTP_200_OK)
        return Response(serializer.errrors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk,*args, **kwargs):
        profile = Profile.objects.get(slug = pk)
        serializer = ProfileSerializers(profile)
        return Response (serializer.data)


class FollowerView(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowerSerializer
    # permission_classes = [IsAuthenticated]

    # def create(self, request, pk, *args, **kwargs):
    #     user = Profile.objects.get(author=self.request.data.get("user_id"))
    #     follow = Profile.objects.get(author=self.request.data.get("following_user_id"))
    #     Follow.objects.create(user_id=user.id, following_user_id=follow.id)
    #     return Response({"Followed": "Successfully!"})
    
    def list(self,request,*args, **kwargs):
        user = self.request.user
        profile = Profile.objects.get(user = user)
        follow = Follow.objects.filter(user_id = profile)
        serializer = FollowerSerializer(follow,many=True)
        return Response (serializer.data)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        profile = Profile.objects.get(user=user)
        follow = Profile.objects.get(user=self.request.data.get("following_user_id"))
        request.data["user_id"] = profile
        # request.data["following_user_id"] = follow
        serial = FollowerSerializer(data=request.data)
        if serial.is_valid():
            serial.save(following_user_id = follow )
            return Response(
                {"follow": "Followed Successfully!"},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serial.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
     
    def destroy(self,request,pk,*args, **kwargs):
           follow = Follow.objects.get(following_user_id=pk) 
           follow.delete()
           return Response({'follow' : "UnFollowed Successfully!"})

# Create your views here.
