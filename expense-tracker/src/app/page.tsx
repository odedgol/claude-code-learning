'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">Expense Tracker</h1>
        <p className="text-xl mb-8">
          Track your expenses, manage your finances, and take control of your spending habits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Link href="/dashboard" 
                className="p-6 text-left border rounded-lg hover:border-blue-500 transition-colors duration-300">
            <h2 className="mb-3 text-2xl font-semibold">Dashboard</h2>
            <p className="text-gray-600">
              View your spending overview, top categories, and recent expenses at a glance.
            </p>
          </Link>
          <Link href="/expenses" 
                className="p-6 text-left border rounded-lg hover:border-blue-500 transition-colors duration-300">
            <h2 className="mb-3 text-2xl font-semibold">Expenses</h2>
            <p className="text-gray-600">
              Manage all your expenses in one place. Add, edit, and delete entries as needed.
            </p>
          </Link>
          <Link href="/expenses/new" 
                className="p-6 text-left border rounded-lg hover:border-blue-500 transition-colors duration-300">
            <h2 className="mb-3 text-2xl font-semibold">Add Expense</h2>
            <p className="text-gray-600">
              Record a new expense with details like date, amount, category, and description.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}