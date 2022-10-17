from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/core/(?P<room_name>\w+)/$', consumers.GameRoomConsumer.as_asgi()),
]