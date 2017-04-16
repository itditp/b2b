# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import (
    PhotoCreate,
    PhotoDelete
)


urlpatterns = [
    url(r'^add/$', PhotoCreate.as_view(), name='add'),
    url(r'^delete/$', PhotoDelete.as_view(), name='delete'),
]
