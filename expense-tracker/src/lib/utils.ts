'use client';

import { Expense, DashboardSummary, ExpenseCategory, ChartData } from './types';
import { CATEGORY_COLORS, CURRENCY_FORMATTER } from './constants';

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return CURRENCY_FORMATTER.format(amount);
};

/**
 * Generate a new expense object
 */
export const createExpenseObject = (
  date: string,
  amount: number,
  category: ExpenseCategory,
  description: string
): Expense => {
  const now = new Date().toISOString();
  
  return {
    id: generateId(),
    date,
    amount,
    category,
    description,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Get current month's expenses
 */
export const getCurrentMonthExpenses = (expenses: Expense[]): Expense[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getFullYear() === currentYear &&
      expenseDate.getMonth() === currentMonth
    );
  });
};

/**
 * Calculate total expenses
 */
export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

/**
 * Get expenses by category
 */
export const getExpensesByCategory = (
  expenses: Expense[]
): Record<ExpenseCategory, number> => {
  return expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<ExpenseCategory, number>
  );
};

/**
 * Get top spending categories
 */
export const getTopCategories = (
  expenses: Expense[],
  limit: number = 3
): { category: ExpenseCategory; amount: number }[] => {
  const expensesByCategory = getExpensesByCategory(expenses);
  
  return Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      category: category as ExpenseCategory,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

/**
 * Generate dashboard summary data
 */
export const generateDashboardSummary = (
  expenses: Expense[]
): DashboardSummary => {
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const monthlyExpenses = calculateTotalExpenses(
    getCurrentMonthExpenses(expenses)
  );
  
  return {
    totalExpenses: calculateTotalExpenses(expenses),
    monthlyExpenses,
    topCategories: getTopCategories(expenses),
    recentExpenses,
  };
};

/**
 * Generate chart data for expenses by category
 */
export const generateCategoryChartData = (expenses: Expense[]): ChartData => {
  const expensesByCategory = getExpensesByCategory(expenses);
  const categories = Object.keys(expensesByCategory) as ExpenseCategory[];
  
  return {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categories.map((category) => expensesByCategory[category]),
        backgroundColor: categories.map(
          (category) => CATEGORY_COLORS[category]
        ),
        borderColor: categories.map((category) => CATEGORY_COLORS[category]),
        borderWidth: 1,
      },
    ],
  };
};

/**
 * Format a date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Parse string to number, handling invalid input
 */
export const parseAmount = (value: string): number | null => {
  const parsed = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  if (isNaN(parsed)) return null;
  return parsed;
};

/**
 * Generate CSV content from expenses
 */
export const generateCsvContent = (expenses: Expense[]): string => {
  if (expenses.length === 0) return '';
  
  const headers = ['Date', 'Amount', 'Category', 'Description'];
  const rows = expenses.map((expense) => [
    expense.date,
    expense.amount.toString(),
    expense.category,
    `"${expense.description.replace(/"/g, '""')}"`, // Escape quotes in CSV
  ]);
  
  return [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');
};

/**
 * Download CSV file
 */
export const downloadCsv = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};