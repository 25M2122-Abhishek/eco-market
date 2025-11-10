from django.conf import settings
from django.db import models

class Product(models.Model):
    title = models.TextField()
    product_link = models.URLField(unique=True)
    selling_price = models.CharField(max_length=50, null=True, blank=True)
    cost_price = models.CharField(max_length=50, null=True, blank=True)
    discount = models.CharField(max_length=50, null=True, blank=True)
    rating = models.CharField(max_length=50, null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    sub_category = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    img_url = models.URLField(null=True, blank=True)
    brand = models.CharField(max_length=511, null=True, blank=True)
    seller = models.URLField(null=True, blank=True)
    scraped_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-scraped_at"]

    def __str__(self):
        return self.title
    

class UserFavorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="favorites"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="favorited_by"
    )
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product")  # Prevent duplicates
        ordering = ["-added_at"]

    def __str__(self):
        return f"{self.user} → {self.product}"