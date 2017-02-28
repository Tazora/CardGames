from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from .models import Round, Points, Tournament

# Create your views here.


def index(request):
    tournaments = Tournament.objects.order_by('pub_date')
    context = {'tournaments': tournaments}
    return render(request, 'doppelkopf/index.html', context)


def detail(request, round_id):
    round_now = get_object_or_404(Round, pk=round_id)
    points_id = Points.objects.filter(round=round_now)
    context = {'round_id': round_now, 'points_id': points_id}
    return render(request, 'doppelkopf/detail.html', context)


def history(request):
    latest_round_list = Round.objects.order_by('-pub_date')
    tournaments = Tournament.objects.order_by('-pub_date')
    context = {'latest_round_list': latest_round_list, 'tournaments': tournaments}
    return render(request, 'doppelkopf/history.html', context)


def tournament(request):
    tournaments = Tournament.objects.order_by('-pub_date')
    context = {'tournaments': tournaments}
    return render(request, 'doppelkopf/tournament.html', context)


def show_tournament(request, tournament_id):
    tournament_now = get_object_or_404(Tournament, pk=tournament_id)
    rounds = Round.objects.filter(tournament_played=tournament_now.id)
    points = tournament_now.get_round_points(rounds)
    context = {'tournament_now': tournament_now, 'rounds': rounds, 'points': points}
    return render(request, 'doppelkopf/tournamentdetail.html', context)


def calculate(request, round_id):
    round_now = get_object_or_404(Round, pk=round_id)
    points_id = Points(round=round_now, round_points_A=request.POST['points_A'], round_points_B=request.POST['points_B'],
                       round_points_C=request.POST['points_C'], round_points_D=request.POST['points_D'])
    points_id.save()
    round_now.add_points(points_id)
    return HttpResponseRedirect(reverse('doppelkopf:detail', args=(round_now.id,)))


def recalculate(request, round_id):
    round_now = get_object_or_404(Round, pk=round_id)
    round_now.recalculate_points()
    return HttpResponseRedirect(reverse('doppelkopf:detail', args=(round_now.id,)))


def insert_round(request):
    tournament = get_object_or_404(Tournament, name=request.POST['tournament'])
    round_now = Round(name=request.POST['name_round'], player_A=request.POST['player_A'],
                      player_B=request.POST['player_B'],
                      player_C=request.POST['player_C'], player_D=request.POST['player_D'], tournament_played=tournament)
    round_now.save()
    return HttpResponseRedirect(reverse('doppelkopf:detail', args=(round_now.id,)))
