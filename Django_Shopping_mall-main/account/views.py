from django.shortcuts import render, redirect
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.models import User
from django.contrib import auth
from account.models import User

# Create your views here.
def login(request):
    if request.method == 'POST':
        user_id = request.POST['user_id']
        password = request.POST['password']
        user = auth.authenticate(request, user_id=user_id, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('main')
        else:
            return render(request, 'login.html', {'error': 'wronginfo'})
    else:
        return render(request, 'login.html')

def logout(request):
    auth.logout(request)
    return redirect('main')

def register(request) :
    if request.method == "POST" :
        if request.POST["password"] == request.POST["password_confirm"] :
            user = User.objects.create(
                user_id = request.POST["user_id"],
                username = request.POST["username"],
                email = request.POST["email"],
                address = request.POST["address"],
                password = request.POST["password"],
                phone_number = request.POST["phone_number"],
            )
            user.set_password(request.POST["password"])
            user.save()
            auth.login(request, user)
            return redirect('main')
        else :
            return render(request, 'register.html')
    
    else:
        return render(request, 'register.html')