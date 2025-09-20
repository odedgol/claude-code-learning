'use client';

import React from 'react';
import ExpenseForm from '@/components/forms/ExpenseForm';

interface EditExpensePageProps {
  params: {
    id: string;
  };
}

export default function EditExpensePage({ params }: EditExpensePageProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Expense</h1>
      <ExpenseForm expenseId={params.id} />
    </div>
  );
}