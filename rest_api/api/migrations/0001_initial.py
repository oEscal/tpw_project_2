# Generated by Django 2.2.6 on 2019-10-21 22:54

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('minute', models.IntegerField(primary_key=True, serialize=False, validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('journey', models.IntegerField(validators=[django.core.validators.MaxValueValidator(34), django.core.validators.MinValueValidator(1)])),
                ('shots', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('ball_possession', models.IntegerField(validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(0)])),
                ('corners', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='KindEvent',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='')),
                ('nick', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Stadium',
            fields=[
                ('address', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('number_seats', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('picture', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('name', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('foundation_date', models.DateField()),
                ('logo', models.ImageField(blank=True, null=True, upload_to='')),
                ('stadium', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Stadium')),
            ],
        ),
        migrations.CreateModel(
            name='PlayerPlayGame',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('event', models.ManyToManyField(to='api.Event')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Game')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Player')),
            ],
        ),
        migrations.AddField(
            model_name='player',
            name='position',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Position'),
        ),
        migrations.AddField(
            model_name='player',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Team'),
        ),
        migrations.AddField(
            model_name='game',
            name='stadium',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Stadium'),
        ),
        migrations.AddField(
            model_name='game',
            name='team',
            field=models.ManyToManyField(to='api.Team'),
        ),
    ]