from rest_framework import serializers
from .models import Product
from .models import UserFavorite

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'brand',
            'selling_price',
            'cost_price',
            'img_url',
            'discount',
            'rating',
            'description',
            'category',
            'sub_category',
            'seller',
            'product_link',
        ]

class UserFavoriteSerializer(serializers.ModelSerializer):
    # Read-only nested product details
    product = ProductSerializer(read_only=True)

    # Write-only product ID field for POST
    product_id = serializers.PrimaryKeyRelatedField(
        source="product",  # maps to the actual 'product' field in model
        queryset=Product.objects.all(),
        write_only=True
    )

    class Meta:
        model = UserFavorite
        fields = ["id", "product", "product_id", "added_at"]

