# -*- coding: utf-8 -*-
from django.db import models
from django.utils import timezone
from django.core.urlresolvers import reverse
from imagekit.models.fields import ImageSpecField
from imagekit.processors import ResizeToFill
from photos.models import Photo

class Item(models.Model):
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    title = models.CharField(max_length=255, verbose_name='Название товара')
    description = models.TextField(null=True, blank=True, verbose_name='Описание товара')
    price = models.DecimalField(default=0, max_digits=5, decimal_places=2, verbose_name='Цена')
    image = models.FileField(upload_to='media/images/goods/', null=True, blank=True, verbose_name='Изображение')
    image_small = ImageSpecField(source='image',
                                 processors=[ResizeToFill(250, 200)],
                                 format='PNG',
                                 options={'quality': 60})

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        ordering = ["-timestamp", "-updated"]


    def get_absolute_url(self):
        return reverse("goods:detail", kwargs={"pk": self.pk})

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    @property
    def photos(self):
        instance = self
        qs = Photo.objects.filter(item=instance)
        return qs
