from django.contrib import admin

# Register your models here.
from .models import Product, Storage, Supplyer

admin.site.register(Product)
admin.site.register(Storage)
admin.site.register(Supplyer)