from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^history/$', views.history, name='history'),
    url(r'^tournament/$', views.tournament, name='tournament'),
    url(r'^tournament/(?P<tournament_id>[0-9]+)/$', views.show_tournament, name='tournamentdetail'),
    url(r'^index/$', views.insert_round, name='insert_round'),
    url(r'^(?P<round_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^(?P<round_id>[0-9]+)/calculate/$', views.calculate, name='calculate'),
    url(r'^(?P<round_id>[0-9]+)/recalculate/$', views.recalculate, name='recalculate'),
]
