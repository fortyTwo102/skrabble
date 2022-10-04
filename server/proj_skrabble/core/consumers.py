from email import message
import json
from channels.generic.websocket import AsyncWebsocketConsumer

from core.views import room

class ChatRoomData():
    def __init__(self, room_group_name):
        self.room_group_name = room_group_name
        self.messages = list()
    
    def add_message(self, message):
        print("added " + message + " to chatroom " + self.room_group_name, end=" ")
        self.messages.append(message)
        print(self.messages)
    
    def get_messages(self):
        return self.messages

chat_room_data_db = dict()

class GameRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # game state manageent

        # if self.room_group_name in chat_room_data_db:
        #     self.chat_room_data = chat_room_data_db[self.room_group_name]
        # else:
        #     self.chat_room_data = ChatRoomData(self.room_group_name)
        #     chat_room_data_db[self.room_group_name] = self.chat_room_data


        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'tester_message',
                'message': "Hello, member of group: %s!" % self.room_group_name ,
            }
        )

        # messages = self.chat_room_data.get_messages()
        # if not len(messages) == 0:
        #     for message in messages:
        #         await self.channel_layer.group_send(
        #             self.room_group_name,
        #             {
        #                 'type': 'chatroom_message',
        #                 'message': message,
        #             }
        #         )

    async def game_state_message(self, event):
        game_state_message = event["game_state_message"]

        await self.send(text_data=json.dumps({
            'game_state_message': game_state_message,
        }))
        
    async def tester_message(self, event):
        tester_message = event["message"]

        await self.send(text_data=json.dumps({
            'message': tester_message,
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        # chat_room_data_db.pop(self.room_group_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        board = text_data_json["board"]
        tally = text_data_json["tally"]

        _game_state_message = {
            "board": board,
            "tally": tally
        }

        game_state_message = json.dumps(_game_state_message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_state_message',
                'game_state_message': game_state_message,
            }
        )
    
    # async def chatroom_message(self, event):
    #     message = event["message"]

    #     await self.send(text_data=json.dumps({
    #         'message': message,
    #     }))




    