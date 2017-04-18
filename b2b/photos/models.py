# -*- coding: utf-8 -*-
from django.db import models
from imagekit.models.fields import ImageSpecField
from imagekit.processors import ResizeToFill
from django.core.urlresolvers import reverse
from django.utils import timezone

class Photo(models.Model):
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
    image = models.ImageField(
        upload_to='media/images/photos/'
    )
    image_middle = ImageSpecField(source='image',
                                 processors=[ResizeToFill(270, 220)],
                                 format='PNG',
                                 options={'quality': 60})

    image_small = ImageSpecField(source='image',
                                 processors=[ResizeToFill(100, 100)],
                                 format='PNG',
                                 options={'quality': 60})
    item = models.ForeignKey("goods.Item")

    class Meta:
        verbose_name = "Фото"
        verbose_name_plural = "Фотографии"
        ordering = ["-timestamp"]

    def get_absolute_url(self):
        return reverse("goods:detail", kwargs={"pk": self.item.pk})
