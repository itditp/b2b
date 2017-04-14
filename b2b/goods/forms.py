from django import forms
from .models import Item


class NewItem(forms.ModelForm):
    class Meta():
        model = Item
        fields = [
            "title",
            "description",
            "price",
            "image",
        ]
        widgets = {
            'title': forms.TextInput(
                attrs={'required': True, 'placeholder': 'title...'}
            ),
            'description': forms.TextInput(
                attrs={'required': True, 'placeholder': 'description...'}
            )
        }

