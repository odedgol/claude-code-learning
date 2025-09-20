'use client';

import React from 'react';
import ExpenseForm from '@/components/forms/ExpenseForm';

export default function AddExpensePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>
      <ExpenseForm />
    </div>
  );
}