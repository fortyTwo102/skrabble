from django.urls import path
from . import views

urlpatterns = [
    path('', views.room, name='room'), # this already has <str:room_name> because of previous redirection
]