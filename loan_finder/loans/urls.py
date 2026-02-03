# loans/urls.py (App URLs)

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('loans/', views.loan_list, name='loan_list'),
    path('loans/<int:pk>/', views.loan_detail, name='loan_detail'),
    path('finder/', views.loan_finder, name='loan_finder'),
    path('inquiry/', views.loan_inquiry, name='loan_inquiry'),
]