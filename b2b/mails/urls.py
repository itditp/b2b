# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import (
    ContactsView,
    MessageView
)


urlpatterns = [
    url(r'^$', ContactsView.as_view(), name='contacts_index'),
    url(r'^send-email/$', MessageView.as_view(), name='send_email'),
]
