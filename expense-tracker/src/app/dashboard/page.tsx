'use client';

import React, { useState, useEffect } from 'react';
import SummaryCard from '@/components/dashboard/SummaryCard';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import TopCategories from '@/components/dashboard/TopCategories';
import ExpenseChart from '@/components/charts/ExpenseChart';
import { getExpenses } from '@/lib/storage';
import { generateDashboardSummary, formatCurrency, calculateTotalExpenses, getCurrentMonthExpenses } from '@/lib/utils';
import { DashboardSummary } from '@/lib/types';
import { loadSampleData } from '@/lib/sampleData';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load sample data for demonstration purposes
    loadSampleData();
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setIsLoading(true);
    const expenses = getExpenses();
    const summary = generateDashboardSummary(expenses);
    setDashboardData(summary);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return <div>Error loading dashboard data.</div>;
  }

  const { totalExpenses, monthlyExpenses, topCategories, recentExpenses } = dashboardData;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Monthly Expenses"
          value={formatCurrency(monthlyExpenses)}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Average Per Day"
          value={formatCurrency(monthlyExpenses / 30)}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Number of Expenses"
          value={String(recentExpenses.length)}
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ExpenseChart expenses={recentExpenses} type="pie" />
        <TopCategories categories={topCategories} totalAmount={totalExpenses} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentExpenses expenses={recentExpenses} />
      </div>
    </div>
  );
}