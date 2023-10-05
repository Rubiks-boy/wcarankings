from django.http import HttpResponse
import threading

from rankings.updatedb import update_all
from rankings.models import SingleRank, AverageRank
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rankings.serializers import RankSerializer, RankPagination


class SingleRankingsList(generics.ListAPIView):
    serializer_class = RankSerializer
    pagination_class = RankPagination

    def get_queryset(self):
        eventId = self.request.query_params.get("eventId")
        if eventId is None:
            eventId = "333"

        return SingleRank.objects.filter(eventId=eventId)


class AverageRankingsList(generics.ListAPIView):
    serializer_class = RankSerializer
    pagination_class = RankPagination

    def get_queryset(self):
        eventId = self.request.query_params.get("eventId")
        if eventId is None:
            eventId = "333"

        return AverageRank.objects.filter(eventId=eventId)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def update(_):
    t_single = threading.Thread(target=update_all)
    t_single.setDaemon(True)
    t_single.start()

    return HttpResponse("cool beans")
