from re import template
from django.contrib import admin
from django.urls import path, include

# views
from django.views.generic import TemplateView
# from core.views import front
from api.views import word
from django.shortcuts import redirect
from core.views import room

# helpers
import random, string

# generate random room name
def generate_room_name():
    global room_name
    room_name = ''.join(random.choices(string.ascii_letters + string.digits, k=6)) + "/"

    return room_name

room_name = ''

urlpatterns = [
    # path("", front, name="front"),
    path('admin/', admin.site.urls),
    path("api/word", word, name="word"),
    path('core/', lambda request: redirect(generate_room_name(), permanent=False)),
    path('core/<str:room_name>/', include("core.urls")),
    path('core/<str:room_name>/static/js/<str:static_js_filename>', lambda request, room_name, static_js_filename: redirect("/static/js/" + static_js_filename, permanent=False)),
    path('core/<str:room_name>/static/css/<str:static_css_filename>', lambda request, room_name, static_css_filename: redirect("/static/css/" + static_css_filename, permanent=False)),
]
