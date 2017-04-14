# -*- coding: utf-8 -*-
from django.db import models
from imagekit.models.fields import ImageSpecField
from imagekit.processors import ResizeToFill

class Photo(models.Model):
    image = models.ImageField(
        upload_to='media/images/photos/',
        null=True,
        blank=True,
    )
    image_small = ImageSpecField(source='image',
                                 processors=[ResizeToFill(100, 100)],
                                 format='PNG',
                                 options={'quality': 60})
    item = models.ForeignKey("goods.Item")
