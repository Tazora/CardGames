# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-11 16:46
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Points',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round_points_A', models.PositiveSmallIntegerField(default=0)),
                ('round_points_B', models.PositiveSmallIntegerField(default=0)),
                ('round_points_C', models.PositiveSmallIntegerField(default=0)),
                ('round_points_D', models.PositiveSmallIntegerField(default=0)),
                ('play_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Round',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('player_A', models.CharField(max_length=100)),
                ('player_B', models.CharField(max_length=100)),
                ('player_C', models.CharField(max_length=100)),
                ('player_D', models.CharField(max_length=100)),
                ('points_A', models.PositiveSmallIntegerField(default=0)),
                ('points_B', models.PositiveSmallIntegerField(default=0)),
                ('points_C', models.PositiveSmallIntegerField(default=0)),
                ('points_D', models.PositiveSmallIntegerField(default=0)),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('last_played', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('played_games', models.PositiveSmallIntegerField(default=0)),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='round',
            name='tournament_played',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='doppelkopf.Tournament'),
        ),
        migrations.AddField(
            model_name='points',
            name='round',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doppelkopf.Round'),
        ),
    ]