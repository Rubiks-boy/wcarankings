from django.urls import path

from rankings.views import update, SingleRankingsList, AverageRankingsList


urlpatterns = [
    path("single", SingleRankingsList.as_view()),
    path("average", AverageRankingsList.as_view()),
    path("update", update, name="update"),
]
