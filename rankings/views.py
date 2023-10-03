from django.http import HttpResponse
from django.core.serializers import serialize
from django.core.paginator import Paginator
import threading

from rankings.updatedb import update_all
from rankings.models import SingleRank, AverageRank

PAGE_SIZE = 1000


def rankings(RankModel, request):
    eventId = request.GET.get("eventId")
    if eventId is None:
        eventId = "333"

    page = request.GET.get("page")
    if page is None:
        page = 1

    all_pages = RankModel.objects.filter(eventId=eventId)
    paginator = Paginator(all_pages, PAGE_SIZE)
    rankings = serialize("json", paginator.get_page(page))

    return HttpResponse({rankings: rankings}, content_type="application/json")


def single(request):
    return rankings(SingleRank, request)


def average(request):
    return rankings(AverageRank, request)


def update(_):
    t_single = threading.Thread(target=update_all)
    t_single.setDaemon(True)
    t_single.start()

    return HttpResponse("cool beans")
