'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Expense, ExpenseFilterOptions } from '@/lib/types';
import { getExpenses, deleteExpense, filterExpenses } from '@/lib/storage';
import { formatCurrency, formatDate, generateCsvContent, downloadCsv } from '@/lib/utils';
import ExpenseFilter from './ExpenseFilter';

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ExpenseFilterOptions>({});

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    setIsLoading(true);
    const allExpenses = getExpenses();
    setExpenses(allExpenses);
    setFilteredExpenses(allExpenses);
    setIsLoading(false);
  };

  const handleFilter = (newFilters: ExpenseFilterOptions) => {
    setFilters(newFilters);
    setFilteredExpenses(filterExpenses(newFilters));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
      loadExpenses();
    }
  };

  const handleExportCsv = () => {
    const csvContent = generateCsvContent(filteredExpenses);
    const filename = `expenses-export-${new Date().toISOString().slice(0, 10)}.csv`;
    downloadCsv(csvContent, filename);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Expenses</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={filteredExpenses.length === 0}
          >
            Export CSV
          </button>
          <Link
            href="/expenses/new"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors text-center"
          >
            Add Expense
          </Link>
        </div>
      </div>

      <ExpenseFilter onFilter={handleFilter} />

      {filteredExpenses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">No expenses found.</p>
          {Object.keys(filters).length > 0 ? (
            <button
              onClick={() => handleFilter({})}
              className="text-primary hover:text-blue-700"
            >
              Clear filters
            </button>
          ) : (
            <Link href="/expenses/new" className="text-primary hover:text-blue-700">
              Add your first expense
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/expenses/${expense.id}/edit`}
                          className="text-primary hover:text-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;