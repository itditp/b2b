# -*- coding: utf-8 -*-
from django.db import models
from imagekit.models.fields import ImageSpecField
from imagekit.processors import ResizeToFill
from django.core.urlresolvers import reverse

class Photo(models.Model):
    image = models.ImageField(
        upload_to='media/images/photos/'
    )
    image_small = ImageSpecField(source='image',
                                 processors=[ResizeToFill(100, 100)],
                                 format='PNG',
                                 options={'quality': 60})
    item = models.ForeignKey("goods.Item")

    def get_absolute_url(self):
        return reverse("goods:detail", kwargs={"pk": self.item.pk})
