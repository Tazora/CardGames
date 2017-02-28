from django.db import models
from django.utils import timezone
from operator import itemgetter


class Tournament(models.Model):
    name = models.CharField(max_length=100)
    played_games = models.PositiveSmallIntegerField(default=0)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def get_round_points(self, rounds):
        points = {}
        points_player = {}
        for r in rounds:
            points.setdefault(r.player_A, []).append(r.points_A)
            points.setdefault(r.player_B, []).append(r.points_B)
            points.setdefault(r.player_C, []).append(r.points_C)
        for i, p in enumerate(points):
            points_sum = 0
            a = points[p]
            for x in a:
                points_sum += x
            points_player[p] = points_sum
        points_player_sorted = sorted(points_player.items(), key=itemgetter(1), reverse=True)
        return points_player_sorted


class Round(models.Model):
    name = models.CharField(max_length=100)
    player_A = models.CharField(max_length=100)
    player_B = models.CharField(max_length=100)
    player_C = models.CharField(max_length=100)
    points_A = models.PositiveSmallIntegerField(default=0)
    points_B = models.PositiveSmallIntegerField(default=0)
    points_C = models.PositiveSmallIntegerField(default=0)
    pub_date = models.DateTimeField(auto_now_add=True)
    last_played = models.DateTimeField(auto_now=True)
    tournament_played = models.ForeignKey(Tournament, related_name="rounds", on_delete=models.CASCADE, default=0)

    class Meta:
        ordering = ['last_played']


    def __str__(self):
        return self.name

    def add_points(self, points):
        self.points_A += int(points.round_points_A)
        self.points_B += int(points.round_points_B)
        self.points_C += int(points.round_points_C)
        return self.save()

    def add_points_single(self, points_A, points_B, points_C):
        self.points_A += int(points_A)
        self.points_B += int(points_B)
        self.points_C += int(points_C)
        return self.save()

    def recalculate_points(self):
        self.points_A = 0
        self.points_B = 0
        self.points_C = 0
        self.save()
        points = Points.objects.filter(round=self)
        for p in points:
            self.points_A += p.round_points_A
            self.points_B += p.round_points_B
            self.points_C += p.round_points_C
        return self.save()

class Points(models.Model): # TODO: Add fields for jacks, game value and so on
    round = models.ForeignKey(Round, related_name="points", on_delete=models.CASCADE)
    round_points_A = models.PositiveSmallIntegerField(default=0)
    round_points_B = models.PositiveSmallIntegerField(default=0)
    round_points_C = models.PositiveSmallIntegerField(default=0)
    play_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}@{}'.format(self.round, self.play_date)
