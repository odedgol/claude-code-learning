'use client';

import { Expense, ExpenseFilterOptions } from './types';
import { STORAGE_KEYS } from './constants';

/**
 * Helper function to check if code is running in browser
 */
const isBrowser = () => typeof window !== 'undefined';

/**
 * Retrieve all expenses from localStorage
 */
export const getExpenses = (): Expense[] => {
  if (!isBrowser()) return [];
  
  try {
    const storedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  } catch (error) {
    console.error('Error loading expenses from localStorage:', error);
    return [];
  }
};

/**
 * Save expenses to localStorage
 */
export const saveExpenses = (expenses: Expense[]): void => {
  if (!isBrowser()) return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses to localStorage:', error);
  }
};

/**
 * Add a new expense
 */
export const addExpense = (expense: Expense): Expense => {
  const expenses = getExpenses();
  const newExpenses = [expense, ...expenses];
  saveExpenses(newExpenses);
  return expense;
};

/**
 * Update an existing expense
 */
export const updateExpense = (updatedExpense: Expense): Expense | null => {
  const expenses = getExpenses();
  const index = expenses.findIndex((exp) => exp.id === updatedExpense.id);
  
  if (index === -1) return null;
  
  expenses[index] = {
    ...updatedExpense,
    updatedAt: new Date().toISOString(),
  };
  
  saveExpenses(expenses);
  return expenses[index];
};

/**
 * Delete an expense by ID
 */
export const deleteExpense = (id: string): boolean => {
  const expenses = getExpenses();
  const filteredExpenses = expenses.filter((exp) => exp.id !== id);
  
  if (filteredExpenses.length === expenses.length) {
    return false; // No expense was deleted
  }
  
  saveExpenses(filteredExpenses);
  return true;
};

/**
 * Get a single expense by ID
 */
export const getExpenseById = (id: string): Expense | null => {
  const expenses = getExpenses();
  return expenses.find((exp) => exp.id === id) || null;
};

/**
 * Filter expenses based on criteria
 */
export const filterExpenses = (options: ExpenseFilterOptions): Expense[] => {
  let expenses = getExpenses();
  
  // Filter by date range
  if (options.startDate) {
    expenses = expenses.filter((exp) => exp.date >= options.startDate!);
  }
  
  if (options.endDate) {
    expenses = expenses.filter((exp) => exp.date <= options.endDate!);
  }
  
  // Filter by category
  if (options.category) {
    expenses = expenses.filter((exp) => exp.category === options.category);
  }
  
  // Filter by search query
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    expenses = expenses.filter(
      (exp) =>
        exp.description.toLowerCase().includes(query) ||
        exp.category.toLowerCase().includes(query)
    );
  }
  
  return expenses;
};