from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),  # Login page is the default page
    path('signup/', views.signup, name='signup'),
    path('dashboard/', views.index, name='index'), 
    path('delete/<int:expense_id>/', views.delete_expense, name='delete_expense'),
# Index page for dashboard
]
