from email import message
import json
from channels.generic.websocket import AsyncWebsocketConsumer

from core.views import room

# initialize game room db
game_room_data_db = dict()
observer_count = 0

class GameRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        global observer_count

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'room_%s' % self.room_name


        # game state manageent

        if self.room_group_name in game_room_data_db:
            if not game_room_data_db[self.room_group_name]["player_two"] \
                and game_room_data_db[self.room_group_name]["player_one"] \
                and game_room_data_db[self.room_group_name]["socket_count"] < 2: 

                game_room_data_db[self.room_group_name]["player_two"] = True

                self.game_state = game_room_data_db[self.room_group_name]
                self.user = "player_two"
                game_room_data_db[self.room_group_name]["socket_count"] += 1

                print("Player Two has joined.")

            elif game_room_data_db[self.room_group_name]["player_two"] \
                and game_room_data_db[self.room_group_name]["player_one"]:
                
                self.user = "observer" + str(observer_count)
                observer_count += 1

                game_room_data_db[self.room_group_name][self.user] = True
                self.game_state = game_room_data_db[self.room_group_name]
                game_room_data_db[self.room_group_name]["socket_count"] += 1

                print(self.user + " has joined.")

            elif not game_room_data_db[self.room_group_name]["player_two"] \
                and game_room_data_db[self.room_group_name]["player_one"] \
                and game_room_data_db[self.room_group_name]["socket_count"] >= 2:
                
                game_room_data_db[self.room_group_name]["player_two"] = True

                self.game_state = game_room_data_db[self.room_group_name]
                self.user = "player_two"
                game_room_data_db[self.room_group_name]["socket_count"] += 1

                print("Player Two has rejoined.")

            elif game_room_data_db[self.room_group_name]["player_two"] \
                and not game_room_data_db[self.room_group_name]["player_one"] \
                and game_room_data_db[self.room_group_name]["socket_count"] >= 2:
                
                game_room_data_db[self.room_group_name]["player_one"] = True

                self.game_state = game_room_data_db[self.room_group_name]
                self.user = "player_one"
                game_room_data_db[self.room_group_name]["socket_count"] += 1

                print("Player One has rejoined.")

        else:
            self.game_state = {
                "player_one": True,
                "player_two": False,
                "socket_count": 1
            }

            self.user = "player_one"

            game_room_data_db[self.room_group_name] = self.game_state

            # debug
            print("Player One has joined.")



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

        self.game_state["role"] = self.user
        print(self.game_state)
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
        game_room_data_db[self.room_group_name]["socket_count"] -= 1
        game_room_data_db[self.room_group_name][self.user] = False
        print(self.user + " has left.")

        if game_room_data_db[self.room_group_name]["socket_count"] == 0:
            print("Destroying game room data for room: " + self.room_group_name)
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



    