from allauth.account.decorators import secure_admin_login
from django.conf import settings
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Product, UserFavorite


if getattr(settings, "DJANGO_ADMIN_FORCE_ALLAUTH", False):
    # Optional: force login through allauth
    admin.autodiscover()
    admin.site.login = secure_admin_login(admin.site.login)  # type: ignore[method-assign]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "selling_price", "seller", "scraped_at")
    search_fields = ("title", "product_link", "seller")
    list_filter = ("seller",)

@admin.register(UserFavorite)
class UserFavouriteAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "added_at")
    search_fields = ("user", "product")
    list_filter = ("user", "product")
