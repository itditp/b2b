# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-04-18 19:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255, verbose_name='Название товара')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание товара')),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=5, verbose_name='Цена')),
            ],
            options={
                'verbose_name': 'Товар',
                'ordering': ['-timestamp', '-updated'],
                'verbose_name_plural': 'Товары',
            },
        ),
    ]
