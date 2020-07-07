from django.urls import include, path

from . import views

urlpatterns = [
    path('rest-auth/facebook/', views.FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/twitter/', views.TwitterLogin.as_view(), name='twitter_login'),
    path('', views.UserListView.as_view()),
]