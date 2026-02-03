# loans/forms.py

from django import forms
from .models import LoanInquiry

class LoanFinderForm(forms.Form):
    LOAN_TYPES = [
        ('', 'Select Loan Type'),
        ('home', 'Home Loan'),
        ('education', 'Education Loan'),
        ('personal', 'Personal Loan'),
        ('car', 'Car Loan'),
        ('business', 'Business Loan'),
    ]
    
    loan_type = forms.ChoiceField(
        choices=LOAN_TYPES,
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    
    loan_amount = forms.DecimalField(
        min_value=10000,
        max_value=100000000,
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enter loan amount'})
    )
    
    credit_score = forms.IntegerField(
        min_value=300,
        max_value=900,
        required=False,
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enter credit score (optional)'})
    )


class LoanInquiryForm(forms.ModelForm):
    EMPLOYMENT_TYPES = [
        ('salaried', 'Salaried'),
        ('self_employed', 'Self Employed'),
        ('business', 'Business Owner'),
        ('professional', 'Professional'),
    ]
    
    employment_type = forms.ChoiceField(
        choices=EMPLOYMENT_TYPES,
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    
    class Meta:
        model = LoanInquiry
        fields = ['name', 'email', 'phone', 'loan_type', 'loan_amount', 'monthly_income', 'credit_score', 'employment_type']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Full Name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email Address'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Phone Number'}),
            'loan_type': forms.Select(attrs={'class': 'form-control'}),
            'loan_amount': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Loan Amount'}),
            'monthly_income': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Monthly Income'}),
            'credit_score': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Credit Score (300-900)'}),
        }