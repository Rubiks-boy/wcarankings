# Generated by Django 4.2.5 on 2023-10-05 08:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rankings", "0006_alter_person_gender"),
    ]

    operations = [
        migrations.AlterField(
            model_name="person",
            name="gender",
            field=models.CharField(max_length=8),
        ),
    ]
