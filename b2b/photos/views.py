from django.views.generic.edit import CreateView, DeleteView
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from utils.decorators import ajax_required

from .forms import NewPhoto
from .models import Photo


class AjaxableResponseMixin(object):
    """ Ajax form based on the django docs example.

    https://docs.djangoproject.com/en/dev/topics/class-based-views/generic-editing/#ajax-example
    https://docs.djangoproject.com/en/dev/topics/class-based-views/mixins/#more-than-just-html
    """

    def render_to_json_response(self, context):
        """Render a json response of the context."""
        return JsonResponse(context)

    def form_invalid(self, form):
        if self.request.is_ajax():
            data = {
            'errors': form.errors
            }
            return self.render_to_json_response(data)

        return super(AjaxableResponseMixin, self).form_invalid(form)

    def form_valid(self, form):
        response = super(AjaxableResponseMixin, self).form_valid(form)
        if self.request.is_ajax():
            # Request is ajax, send a json response
            data = {
                'photo': self.object.image.url,
                'photo_small': self.object.image_small.url
            }
            return self.render_to_json_response(data)
        return response  # Request isn't ajax, send normal response


class PhotoCreate(LoginRequiredMixin, AjaxableResponseMixin, CreateView):
    model = Photo
    form_class = NewPhoto
    template_name = 'photos/form_photo.html'

    @ajax_required
    def dispatch(self,request,*args,**kwargs):
        return super(PhotoCreate,self).dispatch(request,*args,**kwargs)

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance with the passed
        POST variables and then checked for validity.
        """
        if request.is_ajax():
            form = NewPhoto(request.POST or None, request.FILES or None)
            print(form)
            if form.is_valid():
                return self.form_valid(form)
            else:
                return self.form_invalid(form)
        return super(PhotoCreate, self).post(self, request, *args, **kwargs)


class PhotoDelete(LoginRequiredMixin, DeleteView):
    model = Photo
    success_url = '/'

    @ajax_required
    def dispatch(self,request,*args,**kwargs):
        return super(PhotoDelete,self).dispatch(request,*args,**kwargs)

    def delete(self, request, *args, **kwargs):
        if request.is_ajax():
            self.object = self.get_object()
            self.object.delete()
            data = {'delete': 'ok'}
            return JsonResponse(data)
        return super(PhotoDelete, self).delete(self, request, *args, **kwargs)
