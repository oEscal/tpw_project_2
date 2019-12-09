"""rest_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', login, name='login'),
    path('add_stadium', add_stadium, name='add_stadium'),
    path('add_team', add_team, name='add_team'),
    path('add_player', add_player, name='add_player'),
    path('add_game', add_game, name='add_game'),
    path('add_event', add_event, name='add_event'),
    url(r'^add_players_game/(?P<id>\w+)/$', add_players_game, name='add_players_game'),

    path('teams', teams, name='teams'),
    url(r'^team/(?P<name>[\w\s]+)/$', team, name='team'),
    url(r'^player/(?P<id>\w+)/$', player, name='player'),
    url(r'^stadium/(?P<name>[\w\s()]+)/$', stadium, name='stadium'),
    path('games/', games, name='games'),

    url(r'^update_team/(?P<name>[\w\s]+)/$', update_team, name='update_team'),
    url(r'^update_player/(?P<id>\w+)/$', update_player, name='update_player'),
    url(r'^update_stadium/(?P<name>[\w\s()]+)/$', update_stadium, name='update_stadium'),
    url(r'^update_players_game/(?P<id>\w+)/$', update_player_game, name='update_players_game'),             # em falta
    url(r'^update_game/(?P<id>\w+)/$', update_game, name='update_game'),
    # url(r'^update_event/(?P<id>\w+)/$', update_event, name='update_event'),

    url(r'^remove_team/(?P<name>[\w\s]+)/$', remove_team, name='remove_team'),
    url(r'^remove_player/(?P<id>[\w\s]+)/$', remove_player, name='remove_player'),
    url(r'^remove_stadium/(?P<name>[\w\s]+)/$', remove_stadium, name='remove_stadium'),
    url(r'^remove_players_game/(?P<id>[\w\s]+)/$', remove_players_game, name='remove_players_game'),        # em falta
]
