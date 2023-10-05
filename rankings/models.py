from django.db import models


class Person(models.Model):
    id = models.CharField(max_length=12, primary_key=True)
    name = models.CharField(max_length=255)
    countryId = models.CharField(max_length=255)
    gender = models.CharField(max_length=1)


class SingleRank(models.Model):
    id = models.BigAutoField(primary_key=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    eventId = models.CharField(max_length=8)
    best = models.IntegerField()
    worldRank = models.IntegerField()
    continentRank = models.IntegerField()
    countryRank = models.IntegerField()

    def __str__(self):
        return self.person.id


class AverageRank(models.Model):
    id = models.BigAutoField(primary_key=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    eventId = models.CharField(max_length=8)
    best = models.IntegerField()
    worldRank = models.IntegerField()
    continentRank = models.IntegerField()
    countryRank = models.IntegerField()

    def __str__(self):
        return self.person.id
