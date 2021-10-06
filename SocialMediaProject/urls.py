from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.views import LoginView
from django.contrib.auth import views as auth_views
from django.conf import  settings
from django.conf.urls.static import static
from signup.views import RegisterationView
from socialapp.views import ProfileView , FollowerView
from socialapp import views


# making objects
router = DefaultRouter()

# Registering Router to view
router.register(r"auth/register", RegisterationView, basename="Register")
router.register("user/posts", views.PostingView)
router.register("user/comments", views.CommentsView)
router.register("user/userpost", views.UserPostView)
router.register(r"profile", ProfileView)
router.register("Followers", views.FollowerView)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("profile/<slug:pk>/", views.ProfileView),
    path("user/userpost/<slug:pk>/", views.ProfileView),
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
     path('logout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]

urlpatterns  +=static( settings.MEDIA_URL , document_root=settings.MEDIA_ROOT  )

