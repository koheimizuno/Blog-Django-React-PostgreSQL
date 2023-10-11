from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from django.contrib.auth import views as auth_views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'comments', views.CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('postlist', views.PostListCreateView.as_view(), name='postlist'),
    path('postlist/<int:id>/',
         views.PostDetailView.as_view(), name='post_detail'),

    # Start - User Authenticatio Related Urls
    path('token', views.CustomAuthToken.as_view(), name='token_obtain'),
    path('register', views.UserRegistrationView.as_view(), name='register'),
    path('logout', views.LogOutView.as_view(), name='logout'),

    path('register', views.register, name='user_registration'),

    path('password-reset/', auth_views.PasswordResetView.as_view(),
         name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(),
         name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
    # END - User Authenticatio Related Urls
]
