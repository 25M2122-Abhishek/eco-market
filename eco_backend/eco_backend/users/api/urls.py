# eco_backend/users/api/urls.py

from django.urls import path
from .views import UserSignupView, LogoutView

urlpatterns = [
    path("signup/", UserSignupView.as_view(), name="user-signup"),
     path("logout/", LogoutView.as_view(), name="user-logout"),
]