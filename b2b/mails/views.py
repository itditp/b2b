from .forms import NewMessage
from django.views.generic.edit import FormView
from django.views.generic.base import TemplateView
from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse, Http404, JsonResponse


class MessageView(FormView):
    template_name = 'mails/message_form.html'
    form_class = NewMessage

    def render_to_json_response(self, context):
        """Render a json response of the context."""
        return JsonResponse(context)

    def form_invalid(self, form):
        """
        If the form is invalid, re-render the context data with the
        data-filled form and errors.
        """
        if self.request.is_ajax():
            data = {
            'errors': form.errors
            }
            return self.render_to_json_response(data)
        return super(MessageView, self).form_invalid(form)

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        if self.request.is_ajax():
            form.send_email()
            data = {
            'status': 'successfully'
            }
            return JsonResponse(data)
        return super(MessageView, self).form_valid(form)

class ContactsView(TemplateView):
    template_name = "mails/contacts.html"

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(ContactsView, self).get_context_data(**kwargs)
        context['form'] = NewMessage()
        return context
