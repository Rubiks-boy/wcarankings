from django.http import HttpResponse
from django.core import serializers
import threading

from rankings.updatedb import update_all
from rankings.models import SingleRank


def index(request):
    return HttpResponse("Hello, world")


def db(request):
    rankings = serializers.serialize("json", SingleRank.objects.all()[:100])

    return HttpResponse({rankings: rankings}, content_type="application/json")


def update(request):
    t_single = threading.Thread(target=update_all)
    t_single.setDaemon(True)
    t_single.start()

    return HttpResponse("cool beans")
