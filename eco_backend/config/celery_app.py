import os

from celery import Celery
from celery.signals import setup_logging
from celery.schedules import crontab


# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")

app = Celery("eco_backend")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

app.conf.beat_schedule = {
    "scrape_ecoconsious_personalcare_nightly": {
        "task": "eco_backend.products.tasks.scrape_and_save_products",
        "schedule": crontab(hour=0, minute=0),
        "args": ("ecoconsious_personalcare",),
    },
    "scrape_ecohoy_personalcare_nightly": {
        "task": "eco_backend.products.tasks.scrape_and_save_products",
        "schedule": crontab(hour=0, minute=10),
        "args": ("ecohoy_personalcare",),
    },
    "scrape_kleangreen_shop_nightly": {
        "task": "eco_backend.products.tasks.scrape_and_save_products",
        "schedule": crontab(hour=0, minute=20),
        "args": ("kleangreen_shop",),
    },
    "scrape_ecoyaan_personalcare_nightly": {
        "task": "eco_backend.products.tasks.scrape_and_save_products",
        "schedule": crontab(hour=0, minute=30),
        "args": ("ecoyaan_personalcare",),
    },
    "classify_title_for_category_sub_category": {
        "task": "eco_backend.products.tasks.classify_product_title_task",
        "schedule": crontab(hour=1, minute=00),
    }
}


@setup_logging.connect
def config_loggers(*args, **kwargs):
    from logging.config import dictConfig  # noqa: PLC0415

    from django.conf import settings  # noqa: PLC0415

    dictConfig(settings.LOGGING)


# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
