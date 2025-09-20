'use client';

import React from 'react';
import Link from 'next/link';
import { Expense } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface RecentExpensesProps {
  expenses: Expense[];
}

const RecentExpenses: React.FC<RecentExpensesProps> = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Recent Expenses</h3>
        <div className="text-center py-4">
          <p className="text-gray-500">No recent expenses found.</p>
          <Link href="/expenses/new" className="mt-2 text-primary hover:text-blue-700 inline-block">
            Add your first expense
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Recent Expenses</h3>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{expense.description}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">{formatDate(expense.date)}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <div className="font-medium">{formatCurrency(expense.amount)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Link
          href="/expenses"
          className="text-sm text-primary hover:text-blue-700 font-medium flex items-center justify-center"
        >
          View all expenses
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RecentExpenses;