# -*- coding: utf-8 -*-
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import UpdateView, CreateView, DeleteView
from django.http import JsonResponse, Http404, HttpResponse
import json


from .forms import NewItem
from .models import Item


class GoodsListView(ListView):
    model = Item
    template_name = 'goods/goods_list.html'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(GoodsListView, self).get_context_data(**kwargs)
        context['form'] = NewItem
        return context

class ItemDetailView(DetailView):
    model = Item
    template_name = 'goods/detail.html'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(ItemDetailView, self).get_context_data(**kwargs)
        instance = context['object']
        context['form'] = NewItem(instance=instance)
        return context

class AjaxableResponseMixin(object):
    """ Ajax form based on the django docs example.

    https://docs.djangoproject.com/en/dev/topics/class-based-views/generic-editing/#ajax-example
    https://docs.djangoproject.com/en/dev/topics/class-based-views/mixins/#more-than-just-html
    """

    def render_to_json_response(self, context):
        """Render a json response of the context."""
        return JsonResponse(context)

    def form_invalid(self, form):
        response = super(AjaxableResponseMixin, self).form_invalid(form)
        if self.request.is_ajax():
            return self.render_to_json_response(form.errors, status=400)

        return response

    def form_valid(self, form):
        response = super(AjaxableResponseMixin, self).form_valid(form)
        if self.request.is_ajax():
            # Request is ajax, send a json response
            url_detail = self.object.get_absolute_url()
            if self.object.image:
                data = {
                    'pk': self.object.pk,
                    'title': self.object.title,
                    'image': self.object.image.url,
                    'url_detail': url_detail
                }
                return self.render_to_json_response(data)
            else:
                data = {
                    'pk': self.object.pk,
                    'title': self.object.title,
                    'url_detail': url_detail
                }
                return self.render_to_json_response(data)

        return response  # Request isn't ajax, send normal response


class ItemCreate(AjaxableResponseMixin, CreateView):
    model = Item
    form_class = NewItem
    template_name = 'goods/form_item.html'

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance with the passed
        POST variables and then checked for validity.
        """
        if request.is_ajax():
            print('ajax')
            form = NewItem(request.POST, request.FILES)
            print(form)
            if form.is_valid():
                print('valiiid')
                return self.form_valid(form)
            else:
                print('qqqqq')
                return self.form_invalid(form)
        return super(ItemCreate, self).post(self, request, *args, **kwargs)





class ItemUpdate(UpdateView):
    model = Item
    template_name = 'goods/update_form.html'
    form_class = NewItem

    def form_valid(self, form):
        """
        If the request is ajax, save the form and return a json response.
        Otherwise return super as expected.
        """
        if self.request.is_ajax():
            self.object = form.save()
            data = {
            'pk': self.object.pk
            }
            return JsonResponse(data)
        return super(ItemUpdate, self).form_valid(form)

    def form_invalid(self, form):
        """
        We haz errors in the form. If ajax, return them as json.
        Otherwise, proceed as normal.
        """
        if self.request.is_ajax():
            data = {
            'status': 'error'
            }
            return JsonResponse(data)
        return super(ItemUpdate, self).form_invalid(form)


class ItemDelete(DeleteView):
    model = Item
    success_url = '/goods'

    def delete(self, request, *args, **kwargs):
        if request.is_ajax():
            self.object = self.get_object()
            self.object.delete()
            data = {'delete': 'ok'}
            return JsonResponse(data)
        return super(ItemDelete, self).delete(self, request, *args, **kwargs)
