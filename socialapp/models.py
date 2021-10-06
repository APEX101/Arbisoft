from django.db import models
from django.db import models
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.dispatch import receiver




class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
        primary_key=True,
    )
    name = models.CharField(max_length=20, blank=True, null=True)
    bio = models.TextField(max_length=150, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    followers = models.ManyToManyField(
        User, null=True, blank=True, related_name="followers"
    )
    followings = models.ManyToManyField(
        User, related_name="followings", blank=True, null=True
    )
    profile_pic = models.ImageField(default="av1.png")
    cover_pic = models.ImageField(default="cover.jpg")
    slug = models.SlugField(max_length=50 , null=True ,blank = True)


class Follow(models.Model):
    # follower
    user_id = models.ForeignKey(
        "Profile", related_name="followingss", on_delete=models.CASCADE
    )
    # following me
    following_user_id = models.ForeignKey(
        "Profile", related_name="followerss", on_delete=models.CASCADE
    )


class Post(models.Model):
    title = models.CharField(max_length=100 , null=True , blank=True)
    body = models.CharField(max_length=250)
    created_at = models.DateTimeField(default=timezone.now)
    picture = models.ImageField(null=True, blank=True  )
    profile = models.ForeignKey(Profile, related_name="posts", on_delete=models.CASCADE)


class Comment(models.Model):
    body = models.CharField(max_length=150)
    created_at = models.DateTimeField(default=timezone.now)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="comment")
    profile = models.ForeignKey(
        Profile, related_name="comments", on_delete=models.CASCADE
    )


# **Creating Signals so that the porfile is created automatically when User Object is saved in Registeration
# Save profile
@receiver(post_save, sender=User)
def create_profile_after_userCreated(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, name=instance.username)
        instance.profile.save()
        
# **Creating Pre Save signal to add slug field in profile models (as username is unique)
# Save profile
@receiver(pre_save, sender=Profile)
def create_slugfield_forProfile(sender, instance,*args, **kwargs):
    if not instance.slug:
        instance.slug = instance.name

