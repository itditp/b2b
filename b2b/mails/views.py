from .forms import NewMessage
from django.views.generic.edit import FormView
from django.views.generic.base import TemplateView
from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse, Http404


class MessageView(FormView):
    template_name = 'mails/message_form.html'
    form_class = NewMessage

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        if self.request.is_ajax():
            form.send_email()
            data = {
            'status': 'successfully'
            }
            return JsonResponse(data)
        return super(ContactView, self).form_valid(form)

class ContactsView(TemplateView):
    template_name = "mails/contacts.html"

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(ContactsView, self).get_context_data(**kwargs)
        context['form'] = NewMessage()
        return context


# def send_email(request):
#     if request.method == 'POST':
#         subject = request.POST.get('subject', '')
#         message = request.POST.get('message', '')
#         from_email = request.POST.get('from_email', '')
#         response_data = {}
#         # print(subject, message, from_email)
#         if subject and message and from_email:
#             try:
#                 send_mail(subject, message, from_email, ['borodaa@gmail.com'])
#                 response_data['result'] = 'successfully'
#                 response_data['from_email'] = from_email
#                 response_data['message'] = message
#                 response_data['subject'] = subject
#                 # print(response_data)
#             except BadHeaderError:
#                 raise Http404('Invalid header found.')
#             return JsonResponse(response_data)
#         else:
#             # In reality we'd use a form class
#             # to get proper validation errors.
#             raise Http404('Make sure all fields are entered and valid.')
#     else:
#         raise Http404('something is wrong')
