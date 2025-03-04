from django.urls import path
from .views import registro, inicio_sesion
from .views import lista_productos, agregar_producto, realizar_pedido, mis_pedidos

urlpatterns = [
    path('registro/', registro, name='registro'),
    path('login/', inicio_sesion, name='login'),
    path('productos/', lista_productos, name='lista_productos'),
    path('productos/agregar/', agregar_producto, name='agregar_producto'),
    path('pedido/<int:producto_id>/', realizar_pedido, name='realizar_pedido'),
    path('mis-pedidos/', mis_pedidos, name='mis_pedidos'),    
]
