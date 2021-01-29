from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponseRedirect
from .models import Product
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib import auth

# Create your views here.

def main(request):
    return render(request, 'main.html')

def category(request):
    itemList = Product.objects.all()
    return render(request, 'category.html', {'itemList':itemList})

def newItem(request):
    if request.method == 'POST':
        item = Product()
        item.user = request.user
        item.prdName = request.POST['name']
        item.content = request.POST['content']
        item.price = request.POST['price']
        item.discount = request.POST['discount']
        item.save()
        return redirect('category')
        # item.notice_file = request.FILES.get('itemImg',None)
        # item.save()
        
        # detail 로 넘어가는거
    else:
        return render(request,'newItem.html')
    # return render(request, 'category.html')

def item(request):
  return render(request, 'item.html')


def cart(request):
  return render(request, 'cart.html')

def editInfo(request):
  if request.method == "POST":
      change_password = request.POST.get("password")
      password_confirm = request.POST.get("re-password")
      new_address = request.POST.get("address")
      new_phone_number = request.POST.get("phone_number")
      user = request.user
      if (change_password != None ) and (change_password == password_confirm) :
        user.set_password(change_password)
        user.address = new_address
        user.phone_number = new_phone_number
        user.save()
        auth.login(request,user)
        return render(request, "edit-info.html", {'error':'ok'})
      else:
        return render(request, 'edit-info.html', {'error':"password_confirm"})
  else:
      return render(request, 'edit-info.html', {'error':"notice"})

  # return render(request, "edit-info.html",context)

def wishlist(request):
  return render(request, 'wish-list.html')

def orderList(request):
  return render(request, 'order-list.html')

def register(request):
  return render(request, 'register.html')

def orderDetail(request):
  return render(request, 'order-detail.html')

def faq(request) :
  return render(request, 'qna.html')