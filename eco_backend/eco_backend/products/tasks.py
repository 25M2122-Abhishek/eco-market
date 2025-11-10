from celery import shared_task
from eco_backend.products.models import Product
from eco_backend.products.scrapers import SCRAPERS

@shared_task(bind=True)
def scrape_and_save_products(self, scraper_name: str):
    if scraper_name not in SCRAPERS:
        raise ValueError(f"Unknown scraper: {scraper_name}")

    scraper_func = SCRAPERS[scraper_name]
    products_data = scraper_func()

    for item in products_data:
        if item.get("title") and item.get("product_link"):
            try:
                Product.objects.update_or_create(
                    product_link=item["product_link"],
                    defaults={
                        "title": item["title"],
                        "brand": item["brand"],
                        "selling_price": item["selling_price"],
                        "cost_price": item["cost_price"],
                        "img_url": item["img_url"],
                        "discount": item["discount"],
                        "rating": item["rating"],
                        "description": item["description"],
                        "category": item["category"],
                        "sub_category": item["sub_category"],
                        "seller": item["seller"],
                    },
                )
            except:
                continue
            
    return f"{len(products_data)} products processed for {scraper_name}."
