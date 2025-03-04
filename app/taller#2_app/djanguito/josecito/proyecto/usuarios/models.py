from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class Usuario(AbstractUser):
    ROLES = [
        ('cliente', 'Cliente'),
        ('agricultor', 'Agricultor'),
        ('administrador', 'Administrador'),
    ]
    
    rol = models.CharField(max_length=20, choices=ROLES, default='cliente')
    telefono = models.CharField(max_length=15, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)

    # Solución: Evitar conflictos con auth.User
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="usuario_groups",  # Cambiamos el related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="usuario_permissions",  # Cambiamos el related_name
        blank=True
    )

    def __str__(self):
        return f"{self.username} - {self.rol}"

class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_disponible = models.PositiveIntegerField()
    agricultor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='productos')

    def __str__(self):
        return f"{self.nombre} - {self.precio} USD"
    
class Pedido(models.Model):
    cliente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pedidos')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(
        max_length=20,
        choices=[('pendiente', 'Pendiente'), ('completado', 'Completado'), ('cancelado', 'Cancelado')],
        default='pendiente'
    )

    def __str__(self):
        return f"Pedido de {self.cantidad} {self.producto.nombre} por {self.cliente.username} - {self.estado}"
