from django.contrib import admin
from .models import Comment, Post , Profile , Follow


@admin.register(Post)
class Admin(admin.ModelAdmin):
    pass


@admin.register(Comment)
class Admin(admin.ModelAdmin):
    pass



@admin.register(Profile)
class Admin(admin.ModelAdmin):
    pass


@admin.register(Follow)
class Admin(admin.ModelAdmin):
    pass

# Register your models here.
