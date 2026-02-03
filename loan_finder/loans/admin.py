# loans/admin.py

from django.contrib import admin
from .models import Bank, Loan, LoanInquiry


@admin.register(Bank)
class BankAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name']
    list_per_page = 20


@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = [
        'loan_name', 
        'bank', 
        'loan_type', 
        'interest_rate', 
        'min_amount', 
        'max_amount',
        'min_credit_score',
        'created_at'
    ]
    list_filter = ['loan_type', 'bank', 'created_at']
    search_fields = ['loan_name', 'bank__name', 'description']
    list_per_page = 20
    ordering = ['interest_rate']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('bank', 'loan_type', 'loan_name', 'description')
        }),
        ('Loan Terms', {
            'fields': ('interest_rate', 'min_amount', 'max_amount', 
                      'min_tenure_months', 'max_tenure_months', 'processing_fee')
        }),
        ('Eligibility', {
            'fields': ('min_credit_score',)
        }),
        ('Features', {
            'fields': ('features',)
        }),
    )


@admin.register(LoanInquiry)
class LoanInquiryAdmin(admin.ModelAdmin):
    list_display = [
        'name', 
        'email', 
        'phone', 
        'loan_type', 
        'loan_amount', 
        'credit_score',
        'created_at'
    ]
    list_filter = ['loan_type', 'employment_type', 'created_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at']
    list_per_page = 20
    ordering = ['-created_at']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Loan Details', {
            'fields': ('loan_type', 'loan_amount')
        }),
        ('Financial Information', {
            'fields': ('monthly_income', 'credit_score', 'employment_type')
        }),
        ('Metadata', {
            'fields': ('created_at',)
        }),
    )