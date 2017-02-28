from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.reverse import reverse
from skatabend.models import Tournament, Round, Points
from skatabend.serializers import TournamentSerializer, RoundSerializer, PointsSerializer
from rest_framework.decorators import api_view


from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

def index(request):
    tournaments = Tournament.objects.order_by('pub_date')
    context = {'tournaments': tournaments}
    return render(request, 'skatabend/index.html', context)

def detail(request, round_id):
    round_now = get_object_or_404(Round, pk=round_id)
    points_id = Points.objects.filter(round=round_now)
    context = {'round_id': round_now, 'points_id': points_id}
    return render(request, 'skatabend/detail.html', context)

def history(request):
    latest_round_list = Round.objects.order_by('-pub_date')
    tournaments = Tournament.objects.order_by('-pub_date')
    context = {'latest_round_list': latest_round_list, 'tournaments': tournaments}
    return render(request, 'skatabend/history.html', context)

def tournament(request):
    tournaments = Tournament.objects.order_by('-pub_date')
    context = {'tournaments': tournaments}
    return render(request, 'skatabend/tournament.html', context)

def show_tournament(request, tournament_id):
    tournament_now = get_object_or_404(Tournament, pk=tournament_id)
    rounds = Round.objects.filter(tournament_played=tournament_now.id)
    points = tournament_now.get_round_points(rounds)
    context = {'tournament_now': tournament_now, 'rounds': rounds, 'points': points}
    return render(request, 'skatabend/tournamentdetail.html', context)

def calculate(request, round_id):
    round_now = get_object_or_404(Round, pk=round_id)
    points_id = Points(round=round_now, round_points_A=request.POST['PunkteA'], round_points_B=request.POST['PunkteB'],
                       round_points_C=request.POST['PunkteC'])
    points_id.save()
    round_now.add_points(points_id)
    return HttpResponseRedirect(reverse('skatabend:detail', args=(round_now.id,)))

def recalculate(request, round_id):
    round_now = get_object_or_404(Round, pk=round_id)
    round_now.recalculate_points()
    return HttpResponseRedirect(reverse('skatabend:detail', args=(round_now.id,)))

def insertRound(request):
    tournament = get_object_or_404(Tournament, name= request.POST['tournament'])
    round_now = Round(name=request.POST['name_round'], player_A=request.POST['player_A'], player_B=request.POST['player_B'],
                      player_C=request.POST['player_C'], tournament_played=tournament)
    round_now.save()
    return HttpResponseRedirect(reverse('skatabend:detail', args=(round_now.id,)))

class TournamentViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class RoundViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Round.objects.all()
    serializer_class = RoundSerializer

class PointsViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Points.objects.all()
    serializer_class = PointsSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'tournaments': reverse('skatabend:tournament-list', request=request, format=format),
        'rounds': reverse('skatabend:round-list', request=request, format=format),
        'points': reverse('skatabend:point-list', request=request, format=format)
    })