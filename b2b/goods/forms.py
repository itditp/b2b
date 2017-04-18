from django import forms
from .models import Item
import floppyforms as formsImage

# class ImageThumbnailFileInput(formsImage.ClearableFileInput):
#     template_name = 'goods/image_thumbnail.html'

class NewItem(forms.ModelForm):
    class Meta():
        model = Item
        fields = [
            "title",
            "description",
            "price",
            # "image",
        ]
        widgets = {
            'title': forms.TextInput(
                attrs={'required': True, 'placeholder': 'title...'}
            ),
            'description': forms.Textarea(
                attrs={'required': True, 'placeholder': 'description...'}
            )
            # 'image': ImageThumbnailFileInput
        }
