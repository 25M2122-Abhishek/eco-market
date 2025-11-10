from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from django.urls import path, include
from eco_backend.users.api.views import UserViewSet
from eco_backend.products.views import ProductViewSet, UserFavoriteViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("products", ProductViewSet)
router.register("userfavorite", UserFavoriteViewSet)


app_name = "api"

urlpatterns = [
    path("", include(router.urls)),  # /api/users/... endpoints
    path("auth/", include("eco_backend.users.api.urls")),
]