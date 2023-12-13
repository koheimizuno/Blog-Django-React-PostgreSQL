from rest_framework import serializers
from .models import Post, Category, Tag, User, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    # validation for exisiting usernames and email addresses.
    def validate(self, data):
        username = data.get('username')
        email = data.get('email')

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                {'username': 'Username already exists'})
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': 'Email Address already exists'})

        return data


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
       # Check if the email exists in your database
        try:
            user = User.objects.get(email=value)
            print(user)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Email address not found in our database.")

        return value


class PostSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    author = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'
