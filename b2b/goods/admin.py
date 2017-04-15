from django.contrib import admin

# Register your models here.
from .models import Item

class ItemModelAdmin(admin.ModelAdmin):
	list_display = ["title", "updated", "timestamp"]
	list_display_links = ["updated"]
	list_editable = ["title"]
	list_filter = ["updated", "timestamp"]

	search_fields = ["title", "description"]
	class Meta:
		model = Item


admin.site.register(Item, ItemModelAdmin)
