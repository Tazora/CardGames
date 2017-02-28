from django.conf.urls import url, include
from skatabend import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'tournaments', views.TournamentViewSet)
router.register(r'rounds', views.RoundViewSet)
router.register(r'points', views.PointsViewSet)


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^history/$', views.history, name='history'),
    url(r'^tournament/$', views.tournament, name='tournament'),
    url(r'^tournament/(?P<tournament_id>[0-9]+)/$', views.show_tournament, name='tournamentdetail'),
    url(r'^index/$', views.insertRound, name='insertRound'),
    url(r'^(?P<round_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^(?P<round_id>[0-9]+)/calculate/$', views.calculate, name='calculate'),
    url(r'^(?P<round_id>[0-9]+)/recalculate/$', views.recalculate, name='recalculate'),
    url(r'^api/', include(router.urls)),
    #url(r'^api-auth/', include('rest_framework.urls', namespace='skatabend'))
]
