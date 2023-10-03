from django.db import models


class SingleRank(models.Model):
    id = models.BigAutoField(primary_key=True)
    personId = models.CharField(max_length=8)
    eventId = models.CharField(max_length=8)
    best = models.IntegerField()
    worldRank = models.IntegerField()
    continentRank = models.IntegerField()
    countryRank = models.IntegerField()

    def __str__(self):
        return self.personId


class AverageRank(models.Model):
    id = models.BigAutoField(primary_key=True)
    personId = models.CharField(max_length=8)
    eventId = models.CharField(max_length=8)
    best = models.IntegerField()
    worldRank = models.IntegerField()
    continentRank = models.IntegerField()
    countryRank = models.IntegerField()

    def __str__(self):
        return self.personId
