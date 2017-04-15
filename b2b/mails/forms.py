from django import forms
from django.core.mail import send_mail


class NewMessage(forms.Form):
    subject = forms.CharField(widget=forms.TextInput(attrs={'required': True, 'placeholder': 'subject...'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'required': True, 'placeholder': 'email...'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'required': True, 'placeholder': 'subject...'}))

    def send_email(self):
        subject = self.cleaned_data.get('subject', '')
        email = self.cleaned_data.get('name', '')
        message = self.cleaned_data.get('message', '')

        send_mail(
            subject,
            message,
            email,
            ['borodaa@gmail.com']
        )
