from django.contrib import admin

from .models import SingleRank, AverageRank, Person

admin.site.register(SingleRank)
admin.site.register(AverageRank)
admin.site.register(Person)
