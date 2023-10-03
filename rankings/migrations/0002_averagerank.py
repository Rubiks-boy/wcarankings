# Generated by Django 4.2.5 on 2023-10-03 04:32

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rankings", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AverageRank",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("personId", models.CharField(max_length=8)),
                ("eventId", models.CharField(max_length=8)),
                ("best", models.IntegerField()),
                ("worldRank", models.IntegerField()),
                ("continentRank", models.IntegerField()),
                ("countryRank", models.IntegerField()),
            ],
        ),
    ]