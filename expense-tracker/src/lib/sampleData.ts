'use client';

import { Expense, ExpenseCategory } from './types';
import { STORAGE_KEYS } from './constants';
import { createExpenseObject } from './utils';

// Sample expense data for testing and demonstration
export const sampleExpenses: Expense[] = [
  createExpenseObject(
    '2025-09-15',
    34.99,
    'Food',
    'Lunch with colleagues'
  ),
  createExpenseObject(
    '2025-09-14',
    120.50,
    'Shopping',
    'New shoes'
  ),
  createExpenseObject(
    '2025-09-12',
    65.75,
    'Entertainment',
    'Movie tickets and dinner'
  ),
  createExpenseObject(
    '2025-09-10',
    22.30,
    'Transportation',
    'Taxi ride'
  ),
  createExpenseObject(
    '2025-09-08',
    156.87,
    'Bills',
    'Electricity bill'
  ),
  createExpenseObject(
    '2025-09-07',
    45.00,
    'Food',
    'Groceries'
  ),
  createExpenseObject(
    '2025-09-05',
    89.99,
    'Entertainment',
    'Concert tickets'
  ),
  createExpenseObject(
    '2025-09-03',
    12.50,
    'Food',
    'Coffee and pastries'
  ),
  createExpenseObject(
    '2025-09-01',
    210.00,
    'Bills',
    'Internet and phone'
  ),
  createExpenseObject(
    '2025-08-28',
    75.25,
    'Shopping',
    'Clothes'
  ),
  createExpenseObject(
    '2025-08-25',
    18.40,
    'Transportation',
    'Public transit pass'
  ),
  createExpenseObject(
    '2025-08-20',
    42.30,
    'Food',
    'Dinner with friends'
  ),
];

// Function to load sample data into localStorage
export const loadSampleData = (): void => {
  const existingData = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  
  // Only load sample data if there's no existing data
  if (!existingData || JSON.parse(existingData).length === 0) {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(sampleExpenses));
  }
};

// Function to clear all data from localStorage
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.EXPENSES);
};