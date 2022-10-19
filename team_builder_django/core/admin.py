from django.contrib import admin

from .models import Employee, RequestedTeam

# Register your models here.
admin.site.register(Employee)
admin.site.register(RequestedTeam)