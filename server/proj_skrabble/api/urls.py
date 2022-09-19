from django.urls import path
from . import views

urlpatterns = [
    path('word', views.word)
]