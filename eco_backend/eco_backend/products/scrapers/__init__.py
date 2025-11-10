from eco_backend.products.scrapers.ecoconsious.personalcare import scrape_products as ecoconsious_personalcare
from eco_backend.products.scrapers.ecohoy.personalcare import scrape_products as ecohoy_personalcare
from eco_backend.products.scrapers.kleangreen.shop import scrape_products as kleangreen_shop
from eco_backend.products.scrapers.ecoyaan.personalcare import scrape_products as ecoyaan_personalcare

SCRAPERS = {
    "ecoconsious_personalcare": ecoconsious_personalcare,
    "ecohoy_personalcare": ecohoy_personalcare,
    "kleangreen_shop": kleangreen_shop,
    "ecoyaan_personalcare": ecoyaan_personalcare,
}