from django import forms
from .models import Photo


class NewPhoto(forms.ModelForm):
    class Meta():
        model = Photo
        fields = [
            "image",
            "item"
        ]
        widgets = {
            'image': forms.FileInput(
                attrs={'required': True, 'placeholder': 'take an image...'}
            ),
            'item': forms.HiddenInput()
        }
