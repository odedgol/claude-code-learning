import { ExpenseCategory } from './types';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#FF6384',
  Transportation: '#36A2EB',
  Entertainment: '#FFCE56',
  Shopping: '#4BC0C0',
  Bills: '#9966FF',
  Other: '#C9CBCF',
};

export const STORAGE_KEYS = {
  EXPENSES: 'expense-tracker-expenses',
};

export const DATE_FORMAT = 'yyyy-MM-dd';

export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});