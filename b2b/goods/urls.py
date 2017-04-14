# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import (
    GoodsListView,
    ItemDetailView,
    ItemUpdate,
    ItemCreate,
    ItemDelete
)


urlpatterns = [
    url(r'^$', GoodsListView.as_view(), name='list'),
    url(r'^create/$', ItemCreate.as_view(), name='add'),
    url(r'^(?P<pk>\d+)/$', ItemDetailView.as_view(), name='detail'),
    url(r'^(?P<pk>\d+)/edit/$', ItemUpdate.as_view(), name='update'),
    url(r'^(?P<pk>\d+)/delete/$', ItemDelete.as_view(), name='delete'),
]

