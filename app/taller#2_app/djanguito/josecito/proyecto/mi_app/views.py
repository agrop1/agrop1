from django.shortcuts import render

def home_view(request):
    return render(request, 'home.html')  # Verifica que el nombre del archivo es correcto
