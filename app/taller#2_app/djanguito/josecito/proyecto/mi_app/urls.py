from django.urls import path
from .views import home_view

urlpatterns = [
    path('', home_view, name='home'),  # La URL base cargará home.html
]
