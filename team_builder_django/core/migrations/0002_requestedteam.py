# Generated by Django 4.1.2 on 2022-10-19 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestedTeam',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('teamSize', models.IntegerField()),
                ('skills', models.TextField()),
            ],
        ),
    ]
