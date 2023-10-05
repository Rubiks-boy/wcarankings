from rest_framework import serializers, pagination

from rankings.models import Person


class PersonSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ["id", "name", "countryId", "gender"]


class RankSerializer(serializers.Serializer):
    person = PersonSeralizer()
    eventId = serializers.CharField(max_length=8)
    best = serializers.IntegerField()
    worldRank = serializers.IntegerField()


class RankPagination(pagination.PageNumberPagination):
    page_size = 100
    page_query_param = "p"
