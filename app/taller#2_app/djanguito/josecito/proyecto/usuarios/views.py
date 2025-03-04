from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .models import Producto, Pedido
from .forms import RegistroUsuarioForm
from .forms import ProductoForm
from django.contrib.auth.decorators import login_required

def registro(request):
    if request.method == "POST":
        form = RegistroUsuarioForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # Redirige al home después del registro
    else:
        form = RegistroUsuarioForm()
    return render(request, 'registro.html', {'form': form})  # 📌 Asegúrate de que la ruta es correcta

def inicio_sesion(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, "usuarios/login.html", {"error": "Usuario o contraseña incorrectos"})
    return render(request, "login.html")  # 📌 Asegúrate de que la ruta es correcta

def lista_productos(request):
    productos = Producto.objects.all()
    return render(request, 'lista_productos.html', {'productos': productos})

@login_required
def agregar_producto(request):
    if request.method == "POST":
        form = ProductoForm(request.POST)
        if form.is_valid():
            producto = form.save(commit=False)
            producto.agricultor = request.user
            producto.save()
            return redirect('lista_productos')
    else:
        form = ProductoForm()
    return render(request, 'agregar_producto.html', {'form': form})

@login_required
def realizar_pedido(request, producto_id):
    producto = Producto.objects.get(id=producto_id)
    if request.method == "POST":
        cantidad = int(request.POST['cantidad'])
        total = cantidad * producto.precio
        Pedido.objects.create(cliente=request.user, producto=producto, cantidad=cantidad, total=total)
        return redirect('mis_pedidos')
    return render(request, 'realizar_pedido.html', {'producto': producto})

@login_required
def mis_pedidos(request):
    pedidos = Pedido.objects.filter(cliente=request.user)
    return render(request, 'mis_pedidos.html', {'pedidos': pedidos})
