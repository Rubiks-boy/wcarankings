# Generated by Django 4.2.5 on 2023-10-05 04:51

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("rankings", "0004_person_alter_averagerank_personid_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="averagerank",
            old_name="personId",
            new_name="person",
        ),
        migrations.RenameField(
            model_name="singlerank",
            old_name="personId",
            new_name="person",
        ),
    ]
