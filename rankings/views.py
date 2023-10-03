from django.http import HttpResponse

from .models import SingleRank


def index(request):
    return HttpResponse("Hello, world")


def db(request):
    ranking = SingleRank.objects.get(id=1)

    return HttpResponse(ranking)
