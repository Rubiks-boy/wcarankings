# Generated by Django 4.2.5 on 2023-10-05 08:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rankings", "0005_rename_personid_averagerank_person_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="person",
            name="gender",
            field=models.CharField(max_length=2),
        ),
    ]