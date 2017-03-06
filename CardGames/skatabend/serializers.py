from rest_framework import serializers
from skatabend.models import Tournament, Round, Points


class PointsSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='skatabend:points-detail')
    round = serializers.HyperlinkedRelatedField(view_name='skatabend:round-detail', many=False, queryset=Round.objects.all())

    class Meta:
        model = Points
        fields = ('url', 'round', 'round_points_A', 'round_points_B', 'round_points_C', 'play_date')

class RoundSerializer(serializers.HyperlinkedModelSerializer):
    points = PointsSerializer(many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='skatabend:round-detail')
    tournament_played = serializers.HyperlinkedRelatedField(view_name='skatabend:tournament-detail', many=False, queryset=Tournament.objects.all())

    class Meta:
        model = Round
        fields = ('url', 'id', 'name', 'player_A', 'player_B', 'player_C', 'points_A', 'points_B', 'points_C', 'pub_date', 'last_played', 'tournament_played', 'points')

class TournamentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='skatabend:tournament-detail')
    rounds = RoundSerializer(many=True, read_only=True)

    class Meta:
        model = Tournament
        fields = ('url', 'id', 'name', 'played_games', 'pub_date', 'rounds')
