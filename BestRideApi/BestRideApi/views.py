from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings



from .models import User, RecuperarConta,  UserInfo
from .serializers import UserSerializer, UserInfoSerializaer, RecuperarContaSerializaer
from rest_framework import status

from django.contrib.auth.hashers import make_password, check_password


class Utilizadores_operacoes(APIView):
    def get(self, request, id=None):
        if id:
            try:
                queryset = User.objects.get(iduser=id)
            except User.DoesNotExist:
                return Response({'Erro: Utilizador nao existe'}, status=400)
            read_serializer = UserSerializer(queryset)
            return Response(read_serializer.data)
        else:
            snippets = User.objects.all()
            serializer = UserSerializer(snippets, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        request.data['password'] = make_password(request.data.get('password'), 'pbkdf2_sha256')
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            # Check if the todo item the user wants to update exists
            user = User.objects.get(iduser=id)
        except User.DoesNotExist:
            # If the todo item does not exist, return an error response
            return Response({'errors': 'This todo item does not exist.'}, status=400)

        # If the todo item does exists, use the serializer to validate the updated data
        request.data['password'] = make_password(request.data.get('password'), 'pbkdf2_sha256')
        update_serializer = UserSerializer(user, data=request.data)


        # If the data to update the todo item is valid, proceed to saving data to the database
        if update_serializer.is_valid():
            # Data was valid, update the todo item in the database
            userobject = update_serializer.save()

            # Serialize the todo item from Python object to JSON format
            read_serializer = UserSerializer(userobject)

            # Return a HTTP response with the newly updated todo item
            return Response(read_serializer.data, status=200)

        # If the update data is not valid, return an error response
        return Response(update_serializer.errors, status=400)


class Utilizadores_Info_operacoes(APIView):

    def get(self, request, id=None):
        if id:
            try:
                queryset = UserInfo.objects.get(iduserinfo=id)
            except UserInfo.DoesNotExist:
                return Response({'Erro: Info sobre o Utilizador nao existe'}, status=400)
            read_serializer = UserInfoSerializaer(queryset)
            return Response(read_serializer.data)
        else:
            snippets = UserInfo.objects.all()
            serializer = UserInfoSerializaer(snippets, many=True)
            return Response(serializer.data)

    @api_view(['POST'])
    def login(request):
        #Verifica o email
        email = request.data['email']
        password = request.data['password']
        if email:
            try:
                queryset = UserInfo.objects.get(email=email)
            except UserInfo.DoesNotExist:
                return Response({'O Email nao Existe'}, status=400)

        #Verifica o password
            password = make_password(password,'pbkdf2_sha256')
            if password:
                try:
                    queryset_password = User.objects.get(password=password)
                except User.DoesNotExist:
                    return Response({'Password Invalida'}, status=400)

            read_serializer = UserInfoSerializaer(queryset)
            return Response(read_serializer.data)


    def post(self, request, format=None):
        serializer = UserInfoSerializaer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Recuperar_Conta(APIView):
#Para enviar email com o codigo para a recuperação da Pass

    def get(self, request, id=None):
        if id:
            try:
                queryset = RecuperarConta.objects.get(idrecuperarconta=id)
            except RecuperarConta.DoesNotExist:
                return Response({'Erro: Info sobre o Utilizador nao existe'}, status=400)
            read_serializer = RecuperarContaSerializaer(queryset)
            return Response(read_serializer.data)
        else:
            snippets = RecuperarConta.objects.all()
            serializer = RecuperarContaSerializaer(snippets, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        try:
            queryset = UserInfo.objects.get(email=request.data['email'])
        except UserInfo.DoesNotExist:
            return Response({'O Email nao Existe'}, status=400)

        serializer = RecuperarContaSerializaer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    def email(request):
        email = request.data['email']
        code = request.data['code']

        try:
            queryset = UserInfo.objects.get(email=request.data['email'])
        except UserInfo.DoesNotExist:
            return Response({'O Email nao Existe'}, status=400)

        subject = "Código BestRide"
        message = "O seu código para recuperar a sua conta Best Ride é:\n" + str(code)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, email_from, recipient_list)
        return redirect()

    @api_view(['POST'])
    def verificarCodigo(request):
        code = request.data['code']
        try:
            queryset = RecuperarConta.objects.get(code=code)
        except UserInfo.DoesNotExist:
            return Response({'Código Invalido'}, status=400)

        read_serializer = RecuperarContaSerializaer(queryset)
        return Response(read_serializer.data)

