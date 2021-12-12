from django.contrib import messages
from django.shortcuts import redirect, render
from .Home import Item


def App(request):
    return render(request, "App.js")
