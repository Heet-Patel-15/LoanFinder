# loans/models.py

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Bank(models.Model):
    name = models.CharField(max_length=200)
    logo = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']


class Loan(models.Model):
    LOAN_TYPES = [
        ('home', 'Home Loan'),
        ('education', 'Education Loan'),
        ('personal', 'Personal Loan'),
        ('car', 'Car Loan'),
        ('business', 'Business Loan'),
    ]
    
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='loans')
    loan_type = models.CharField(max_length=20, choices=LOAN_TYPES)
    loan_name = models.CharField(max_length=200)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0)])
    min_amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    max_amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    min_tenure_months = models.IntegerField(validators=[MinValueValidator(1)])
    max_tenure_months = models.IntegerField(validators=[MinValueValidator(1)])
    min_credit_score = models.IntegerField(validators=[MinValueValidator(300), MaxValueValidator(900)])
    processing_fee = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage")
    description = models.TextField()
    features = models.TextField(help_text="Comma-separated features")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.bank.name} - {self.loan_name}"
    
    class Meta:
        ordering = ['interest_rate', 'bank__name']


class LoanInquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    loan_type = models.CharField(max_length=20)
    loan_amount = models.DecimalField(max_digits=12, decimal_places=2)
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2)
    credit_score = models.IntegerField(validators=[MinValueValidator(300), MaxValueValidator(900)])
    employment_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.loan_type}"
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Loan Inquiries"