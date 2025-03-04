from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario
from .models import Producto

class RegistroUsuarioForm(UserCreationForm):
    telefono = forms.CharField(max_length=15, required=False)
    direccion = forms.CharField(widget=forms.Textarea, required=False)

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'telefono', 'direccion', 'rol', 'password1', 'password2']

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'cantidad_disponible']