from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Post, Category, Tag, Comment
from .serializers import PostSerializer, CategorySerializer, TagSerializer, CommentSerializer


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class TagListCrateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer = TagSerializer
    permission_classes = [IsAuthenticated]


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer = CommentSerializer
    permission_classes = [IsAuthenticated]


def home(request):
    return JsonResponse({'message': 'Testing App'})
