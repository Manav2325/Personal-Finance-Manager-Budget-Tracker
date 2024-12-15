from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from .models import Expense


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')  # Redirect to index after successful login
        else:
            messages.error(request, 'Invalid username or password')
    return render(request, 'login.html')  # Serve the login.html template

def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        if password == confirm_password:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username already exists')
            else:
                user = User.objects.create_user(username=username, password=password)
                login(request, user)  # Automatically log in the user
                return redirect('index')
        else:
            messages.error(request, 'Passwords do not match')
    return render(request, 'signup.html')  # Serve the signup.html template

@login_required
def index(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        amount = float(request.POST.get('amount'))
        expense_id = request.POST.get('expense_id')  # For editing

        if expense_id:  # Edit existing expense
            expense = get_object_or_404(Expense, id=expense_id, user=request.user)
            expense.name = name
            expense.amount = amount
            expense.save()
        else:  # Add a new expense
            Expense.objects.create(user=request.user, name=name, amount=amount)

        return redirect('index')

    # Retrieve all expenses for the logged-in user
    expenses = Expense.objects.filter(user=request.user)

    # Calculate income, expense, and balance
    income = sum(exp.amount for exp in expenses if exp.amount > 0)
    expense = sum(abs(exp.amount) for exp in expenses if exp.amount < 0)
    balance = income - expense

    return render(request, 'index.html', {
        'expenses': expenses,
        'income': income,
        'expense': expense,
        'balance': balance
    })
@login_required
def delete_expense(request, expense_id):
    # Fetch and delete the expense associated with the user
    expense = get_object_or_404(Expense, id=expense_id, user=request.user)
    expense.delete()
    return redirect('index')