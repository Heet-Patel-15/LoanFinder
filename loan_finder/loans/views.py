# loans/views.py

from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.db.models import Q
from .models import Loan, Bank
from .forms import LoanFinderForm, LoanInquiryForm


def home(request):
    """Home page view"""
    featured_loans = Loan.objects.all()[:6]
    loan_types = Loan.LOAN_TYPES
    context = {
        'featured_loans': featured_loans,
        'loan_types': loan_types,
    }
    return render(request, 'loans/home.html', context)


def loan_list(request):
    """List all loans with filtering"""
    loans = Loan.objects.all()
    
    # Get filter parameters
    loan_type = request.GET.get('loan_type')
    min_amount = request.GET.get('min_amount')
    max_amount = request.GET.get('max_amount')
    bank_id = request.GET.get('bank')
    
    # Apply filters
    if loan_type:
        loans = loans.filter(loan_type=loan_type)
    
    if min_amount:
        loans = loans.filter(max_amount__gte=min_amount)
    
    if max_amount:
        loans = loans.filter(min_amount__lte=max_amount)
    
    if bank_id:
        loans = loans.filter(bank_id=bank_id)
    
    # Get all banks for filter dropdown
    banks = Bank.objects.all()
    loan_types = Loan.LOAN_TYPES
    
    context = {
        'loans': loans,
        'banks': banks,
        'loan_types': loan_types,
        'selected_type': loan_type,
        'selected_bank': bank_id,
    }
    return render(request, 'loans/loan_list.html', context)


def loan_detail(request, pk):
    """Detailed view of a specific loan"""
    loan = get_object_or_404(Loan, pk=pk)
    features_list = [f.strip() for f in loan.features.split(',')]
    context = {
        'loan': loan,
        'features_list': features_list,
    }
    return render(request, 'loans/loan_detail.html', context)


def loan_finder(request):
    """Loan finder with form submission"""
    matching_loans = None
    
    if request.method == 'POST':
        form = LoanFinderForm(request.POST)
        if form.is_valid():
            loan_type = form.cleaned_data['loan_type']
            loan_amount = form.cleaned_data['loan_amount']
            credit_score = form.cleaned_data.get('credit_score')
            
            # Filter loans
            matching_loans = Loan.objects.filter(
                loan_type=loan_type,
                min_amount__lte=loan_amount,
                max_amount__gte=loan_amount
            )
            
            if credit_score:
                matching_loans = matching_loans.filter(min_credit_score__lte=credit_score)
            
            matching_loans = matching_loans.order_by('interest_rate')
    else:
        form = LoanFinderForm()
    
    context = {
        'form': form,
        'matching_loans': matching_loans,
    }
    return render(request, 'loans/loan_finder.html', context)


def loan_inquiry(request):
    """Handle loan inquiry form submission"""
    if request.method == 'POST':
        form = LoanInquiryForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your loan inquiry has been submitted successfully! We will contact you soon.')
            return redirect('home')
    else:
        form = LoanInquiryForm()
    
    context = {
        'form': form,
    }
    return render(request, 'loans/loan_inquiry.html', context)