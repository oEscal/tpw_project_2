import base64

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import *

import rest_api.queries as queries
from api.serializers import *
from rest_api.settings import MAX_PLAYERS_MATCH, MIN_PLAYERS_MATCH


def verify_if_admin(user):
    username = whoami(user)

    try:
        user = User.objects.get(username=username)
        if user.is_staff:
            return True
    except Exception as e:
        # when the user doesn't exist
        print(e)
        return False
    return False


def whoami(user):
    return user.username


def image_to_base64(image):
    if image:
        photo_b64 = base64.b64encode(image.file.read())
        photo_b64 = photo_b64.decode()
        return photo_b64
    return None


def create_response(message, status, token=None, data=None):
    return Response({
        "message": message,
        "data": data,
        "token": token,
    }, status=status)


@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    login_serializer = UserLoginSerializer(data=request.data)
    if not login_serializer.is_valid():
        return create_response("Dados inválidos!", HTTP_404_NOT_FOUND, data=login_serializer.errors)

    user = authenticate(
        username=login_serializer.data['username'],
        password=login_serializer.data['password']
    )

    if not user:
        message = "Login inválido!"
        return create_response(message, HTTP_404_NOT_FOUND)

    # TOKEN STUFF
    token, _ = Token.objects.get_or_create(user=user)

    return create_response("Login feito com sucesso", HTTP_200_OK, token=token.key)


######################### Add #########################


@csrf_exempt
@api_view(["POST"])
def add_stadium(request):
    status = HTTP_200_OK
    message = ""
    data = []

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)

    token = Token.objects.get(user=request.user).key
    try:
        stadium_serializer = StadiumSerializer(data=request.data)
        if not stadium_serializer.is_valid():
            data = stadium_serializer.errors
            status = HTTP_400_BAD_REQUEST
            message = "Dados inválidos!"
        else:
            add_status, message = queries.add_stadium(stadium_serializer.data)
            status = HTTP_200_OK if add_status else HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a adicionar novo estádio!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["POST"])
def add_team(request):
    status = HTTP_200_OK
    message = ""
    data = []

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)

    token = Token.objects.get(user=request.user).key
    try:
        team_serializer = TeamSerializer(data=request.data)
        if not team_serializer.is_valid():
            status = HTTP_400_BAD_REQUEST
            message = "Dados inválidos!"
            data = team_serializer.errors
        else:
            add_status, message = queries.add_team(team_serializer.data)
            status = HTTP_200_OK if add_status else HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a adicionar nova equipa!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["POST"])
def add_player(request):
    status = HTTP_200_OK
    message = ""
    data = []

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)

    token = Token.objects.get(user=request.user).key
    try:
        player_serializer = PlayerSerializer(data=request.data)
        if not player_serializer.is_valid():
            data = player_serializer.errors
            status = HTTP_400_BAD_REQUEST
            message = "Dados inválidos!"
        else:
            add_status, message = queries.add_player(player_serializer.data)
            status = HTTP_200_OK if add_status else HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro ao adicionar jogador!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["POST"])
def add_event(request, id):
    status = HTTP_200_OK
    message = ""
    data = []

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)

    token = Token.objects.get(user=request.user).key
    try:
        request.data['game'] = id
        event_serializer = GamePlayerEventSerializer(data=request.data)
        if not event_serializer.is_valid():
            data = event_serializer.errors
            status = HTTP_400_BAD_REQUEST
            message = "Dados inválidos!"
        else:
            add_status, message = queries.add_event(event_serializer.data)
            status = HTTP_200_OK if add_status else HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro ao adicionar evento!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["POST"])
def add_game(request):
    status = HTTP_200_OK
    message = ""
    data = []

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)

    token = Token.objects.get(user=request.user).key
    try:
        game_serializer = GameSerializer(data=request.data)
        if not game_serializer.is_valid():
            data = game_serializer.errors
            status = HTTP_400_BAD_REQUEST
            message = "Dados inválidos!"
        else:
            add_status, message = queries.add_game(game_serializer.data)
            status = HTTP_200_OK if add_status else HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro ao adicionar jogo!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["POST"])
def add_players_game(request, id):
    status = HTTP_200_OK
    message = ""
    data = []

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)

    token = Token.objects.get(user=request.user).key
    try:
        make_query = True

        # verify if number of players is greater or smaller than the constraints
        for team_name in request.data:
            if len(set(request.data[team_name])) > MAX_PLAYERS_MATCH or len(set(request.data[team_name])) < MIN_PLAYERS_MATCH:
                message = f"Tem de escolher entre {MIN_PLAYERS_MATCH} e {MAX_PLAYERS_MATCH} " \
                            f"jogadores na equipa {team_name}!"
                status = HTTP_400_BAD_REQUEST
                make_query = False
        if make_query:
            add_status, message = queries.add_player_to_game({
                'id': id,
                'teams': request.data
            })
            status = HTTP_200_OK if add_status else HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro ao adicionar  jogador ao jogo!"

    return create_response(message, status, token=token, data=data)


######################### Get #########################


@api_view(["GET"])
@permission_classes((AllowAny,))
def teams(request):
    status = HTTP_200_OK
    message = ""
    data = []
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_teams()
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter todas as equipas!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def team(request, name):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_team(name)
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter a equipa!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def player(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_player(id)
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter o jogador!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def stadium(request, name):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_stadium(name)
        if not data:
            status = HTTP_404_NOT_FOUND

    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter o estádio!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def get_all_unused_stadiums(request):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_all_unused_stadiums()
        if not data:
            status = HTTP_404_NOT_FOUND

    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter os estádios!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def games(request):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_games()
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter todos os jogos"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def positions(request):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_positions()
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter as posições"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def stadiums(request):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_stadiums()
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter todos os estádios"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def get_game_team_players(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_game_team_players(id)
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter os jogadores das equipas que jogaram no jogo!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def get_players_per_game_and_events(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_players_per_game_and_events(id)
        print(data)
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter os jogadores e as equipas que jogaram num jogo!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def game(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_info_game(id)
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter o jogo!"

    return create_response(message, status, token=token, data=data)


@api_view(["GET"])
@permission_classes((AllowAny,))
def event(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if verify_if_admin(request.user):
        token = Token.objects.get(user=request.user).key

    try:
        data, message = queries.get_minimal_event(id)
        if not data:
            status = HTTP_404_NOT_FOUND
    except Exception as e:
        print(e)
        status = HTTP_403_FORBIDDEN
        message = "Erro a obter o evento!"

    return create_response(message, status, token=token, data=data)


######################### Update #########################


@csrf_exempt
@api_view(["PUT"])
def update_team(request, name):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            data_to_update = request.data
            data_to_update['name'] = name

            add_status, message = queries.update_team(data_to_update)
            if not add_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro ao editar equipa!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["PUT"])
def update_player(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            data_to_update = request.data
            data_to_update['id'] = id

            update_status, message = queries.update_player(data_to_update)
            if not update_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro ao editar jogador!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["PUT"])
def update_stadium(request, name):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            data_to_update = request.data
            data_to_update['current_name'] = name

            update_status, message = queries.update_stadium(data_to_update)
            if not update_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro ao editar estádio!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["PUT"])
def update_player_game(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            make_query = True

            # verify if number of players is greater or smaller than the constraints
            print(request.data)
            for team_name in request.data:
                if len(set(request.data[team_name])) > MAX_PLAYERS_MATCH or len(
                        set(request.data[team_name])) < MIN_PLAYERS_MATCH:
                    message = f"Tem de escolher entre {MIN_PLAYERS_MATCH} e {MAX_PLAYERS_MATCH} " \
                              f"jogadores na equipa {team_name}!"
                    status = HTTP_400_BAD_REQUEST
                    make_query = False
            if make_query:
                add_status, message = queries.update_player_to_game({
                    'id': id,
                    'teams': request.data
                })
                status = HTTP_200_OK if add_status else HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro ao editar jogadores que jogaram no referido jogo!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["PUT"])
def update_game(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            data_to_update = request.data
            data_to_update['id'] = id

            update_status, message = queries.update_game(data_to_update)
            if not update_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro ao editar jogo!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["PUT"])
def update_event(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            data_to_update = request.data
            data_to_update['id'] = id

            update_status, message = queries.update_event(data_to_update)
            if not update_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro ao editar evento!"

    return create_response(message, status, token=token, data=data)


######################### Delete #########################


@csrf_exempt
@api_view(["DELETE"])
def remove_team(request, name):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            remove_status, message = queries.remove_team(name)

            if not remove_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro a eliminar equipa!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["DELETE"])
def remove_player(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            remove_status, message = queries.remove_player(id)

            if not remove_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro a eliminar jogador!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["DELETE"])
def remove_stadium(request, name):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            remove_status, message = queries.remove_stadium(name)

            if not remove_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro a eliminar estádio!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["DELETE"])
def remove_players_game(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            remove_status, message = queries.remove_allplayersFrom_game(id)

            if not remove_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro a eliminar estádio!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["DELETE"])
def remove_game(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            remove_status, message = queries.remove_game(id)

            if not remove_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro a eliminar jogo!"

    return create_response(message, status, token=token, data=data)


@csrf_exempt
@api_view(["DELETE"])
def remove_event(request, id):
    status = HTTP_200_OK
    message = ""
    data = {}
    token = ""

    if not verify_if_admin(request.user):
        return create_response("Login inválido!", HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=request.user).key
        try:
            remove_status, message = queries.remove_event(id)

            if not remove_status:
                status = HTTP_404_NOT_FOUND
        except Exception as e:
            print(e)
            status = HTTP_403_FORBIDDEN
            message = "Erro a eliminar evento!"

    return create_response(message, status, token=token, data=data)
