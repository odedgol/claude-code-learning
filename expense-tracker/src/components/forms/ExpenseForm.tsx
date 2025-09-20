'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { ExpenseFormData, Expense, ExpenseCategory } from '@/lib/types';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import { createExpenseObject, parseAmount } from '@/lib/utils';
import { addExpense, updateExpense, getExpenseById } from '@/lib/storage';

interface ExpenseFormProps {
  expenseId?: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expenseId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});
  
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Food',
    description: '',
  });

  useEffect(() => {
    if (expenseId) {
      const expense = getExpenseById(expenseId);
      if (expense) {
        setFormData({
          date: expense.date,
          amount: expense.amount,
          category: expense.category,
          description: expense.description,
        });
      }
    }
  }, [expenseId]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ExpenseFormData, string>> = {};
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else {
      const amount = parseAmount(formData.amount.toString());
      if (amount === null || isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Amount must be a positive number';
      }
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear the error for this field when user makes changes
    if (errors[name as keyof ExpenseFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      setFormData((prev) => ({ ...prev, date: dateString }));
      
      if (errors.date) {
        setErrors((prev) => ({ ...prev, date: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const amount = parseAmount(formData.amount.toString());
      
      if (amount === null) {
        setErrors((prev) => ({
          ...prev,
          amount: 'Invalid amount',
        }));
        setLoading(false);
        return;
      }
      
      if (expenseId) {
        // Update existing expense
        const existingExpense = getExpenseById(expenseId);
        if (existingExpense) {
          const updatedExpense: Expense = {
            ...existingExpense,
            date: formData.date,
            amount,
            category: formData.category as ExpenseCategory,
            description: formData.description,
            updatedAt: new Date().toISOString(),
          };
          
          updateExpense(updatedExpense);
        }
      } else {
        // Create new expense
        const newExpense = createExpenseObject(
          formData.date,
          amount,
          formData.category as ExpenseCategory,
          formData.description
        );
        
        addExpense(newExpense);
      }
      
      // Redirect to expenses list
      router.push('/expenses');
    } catch (error) {
      console.error('Error saving expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        {expenseId ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <DatePicker
            id="date"
            selected={formData.date ? new Date(formData.date) : null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className={`w-full p-2 border rounded-md ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className={`w-full p-2 pl-7 border rounded-md ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md bg-white ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this expense for?"
            className={`w-full p-2 border rounded-md ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : expenseId ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;