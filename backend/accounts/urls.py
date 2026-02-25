from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/test/', views.test_api, name='test_api'),
    path('api/signup/', views.signup, name='signup'),
    path('api/login/', views.login, name='login'),
    path('api/check-email/', views.check_email, name='check_email'),
]