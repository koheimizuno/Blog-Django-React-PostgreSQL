from django.http import JsonResponse

# For Define API Views
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from .models import Post, Category, Tag, Comment, User
from .serializers import PostSerializer, CategorySerializer, TagSerializer, CommentSerializer, UserSerializer, PasswordResetSerializer

# For User Authentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken, APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth.hashers import make_password
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm
from django.contrib.auth import login
from django.shortcuts import render, redirect

# For PasswordRest
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.core import mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]


class PostDetailView(generics.RetrieveAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'id'

    def get_queryset(self):
        query = Post.objects.filter(id=self.kwargs.get('id'))
        return query


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class TagListCrateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]


class CustomUserCreateForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']


def home(request):
    return JsonResponse({'message': 'Testing App'})

# For User Authentication


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key, 'user_id': user.id, 'user_name': user.username})


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        hashed_password = make_password(serializer.validated_data['password'])
        serializer.validated_data['password'] = hashed_password
        user = serializer.save()
        Token.objects.create(user=user)


class LogOutView(APIView):
    permission_class = [IsAuthenticated]

    def post(self, request):
        user = request.user
        token = request.auth

        if user is not None and token is not None:
            # Logout the user by deleting their token.
            token.delete()
            return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset(request):
    serializer = PasswordResetSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'No user with this email address.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a password reset token and send an email with a link to reset the password.
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        frontend_url = "http://localhost:3000"
        context = {
            'user': user,
            'domain': frontend_url,
            'uid': urlsafe_base64_encode(force_bytes(user.id)),
            'token': token,
        }

        subject = 'Password Reset'
        message = render_to_string(
            'email_templates/password_reset_email.html', context)
        from_email = 'noreply@example.com'
        recipient_list = [email]
        mail.send_mail(subject, message, from_email, recipient_list)

        return Response({'detail': 'Password reset email sent.'}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request, uidb64, token):
    User = get_user_model()
    try:
        # Decode the uidb64 to get the user's ID
        user_id = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(id=user_id)

        # Check if the token is valid
        if default_token_generator.check_token(user, token):
            if request.method == 'POST':
                new_password = request.data.get('new_password1')
                form = SetPasswordForm(user, request.data)
                if form.is_valid():
                    # Set the new password
                    user.set_password(new_password)
                    user.save()
                    return JsonResponse({'detail': 'Password reset successful'}, status=status.HTTP_200_OK)
                else:
                    print(form.errors)
                    return JsonResponse({'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return JsonResponse({'detail': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
