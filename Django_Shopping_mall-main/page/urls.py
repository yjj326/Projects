from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name="main"),
    path('category/newItem', views.newItem, name="newItem"),
    path('item/', views.item, name="item"),
    path('category', views.category, name="category"),
    path('category/newItem', views.newItem, name="newItem"),
    path('category/', views.category, name="category"),
    path('item/', views.item, name="item"),
    path('cart/', views.cart, name="cart"),
    path('editInfo/', views.editInfo, name="editInfo"),
    path('wishlist/', views.wishlist, name="wishlist"),
    path('orderList/', views.orderList, name="orderList"),
    path('register/', views.register, name="register"),
    path('orderDetail/', views.orderDetail, name="orderDetail"),
    path('faq/', views.faq, name="faq"),
]