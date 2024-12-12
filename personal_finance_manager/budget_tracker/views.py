from django.shortcuts import render

def home(request):
    return render(request, 'budget_tracker/index.html')
