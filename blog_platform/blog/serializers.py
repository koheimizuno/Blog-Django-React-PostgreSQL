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
    category = CategorySerializer()
    author = UserSerializer()
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'

    # def create(self, valid_data):
    #     category_data = valid_data.pop('category', None)
    #     user_data = valid_data.pop('user')
    #     tags_data = valid_data.pop('tags', None)

    #     post = Post.objects.create(**valid_data)

    #     category = Category.objects.get(pk=category_data['id'])
    #     post.category = category

    #     user = User.objects.get(pk=user_data['id'])
    #     post.user = user

    #     for tag_data in tags_data:
    #         tag, _ = Tag.objects.get_or_create(name=tag_data['name'])
    #         post.tags.add(tag)

    #     return post

    # def update(self, instance, valid_data):
    #     category_data = valid_data.pop('catergory', None)
    #     tags_data = valid_data.pop('tags', None)

    #     instance.title = valid_data.get('title', instance.title)
    #     instance.content = valid_data.get('content', instance.content)

    #     if category_data:
    #         category = Category.objects.get(pk=category_data['id'])
    #         instance.category = category

    #     if tags_data:
    #         instance.tags.clear()

    #         for tag_data in tags_data:
    #             tag, _ = Tag.objects.get_or_create(name=tags_data['name'])
    #             instance.tags.add(tag)

    #     instance.save()

    #     return instance

    # def delete(self, instance):
    #     instance.delet()
    #     return instance


class CommentSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    author = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'
