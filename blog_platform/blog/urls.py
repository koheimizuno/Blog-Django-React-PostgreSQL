from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'comments', views.CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('postlist', views.PostListCreateView.as_view(), name='postlist')
]
