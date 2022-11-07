from django.contrib import admin

from .models import Employee, RequestedTeam,SentTeam

# Register your models here.
admin.site.register(Employee)
admin.site.register(RequestedTeam)
admin.site.register(SentTeam)
