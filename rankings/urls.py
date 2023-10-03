from django.urls import path

from . import views

urlpatterns = [
    path("single", views.single, name="single"),
    path("average", views.average, name="average"),
    path("update", views.update, name="update"),
]
