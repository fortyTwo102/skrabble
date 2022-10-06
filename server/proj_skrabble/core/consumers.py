from email import message
import json
from channels.generic.websocket import AsyncWebsocketConsumer

from core.views import room

# initialize game room db
game_room_data_db = dict()

class GameRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # game state manageent

        if self.room_group_name in game_room_data_db:
            self.game_state = game_room_data_db[self.room_group_name]
        else:
            self.game_state = dict()
            game_room_data_db[self.room_group_name] = self.game_state


        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # just a welcom beacon
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'tester_message',
                'message': "Hello, member of group: %s!" % self.room_group_name ,
            }
        )

        # if a player is resuming the game in another tab
        if not len(self.game_state) == 0:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_state_message',
                    'game_state_message':  json.dumps(self.game_state),
                }
            )
    
        
    # message handlers
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

        game_room_data_db.pop(self.room_group_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        for game_state_variable in ["board", "tally", "cursor", "turnInProgress", "wordsMade", "activePlayer"]:

            game_state_variable_value = text_data_json.get(game_state_variable, None)

            if game_state_variable_value is not None:

                # save game state in db
                self.game_state[game_state_variable] = game_state_variable_value
                game_room_data_db[self.room_group_name] = self.game_state

                _game_state_message = {
                    game_state_variable: game_state_variable_value,
                }

                game_state_message = json.dumps(_game_state_message)

                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_state_message',
                        'game_state_message': game_state_message,
                    }
                )



    