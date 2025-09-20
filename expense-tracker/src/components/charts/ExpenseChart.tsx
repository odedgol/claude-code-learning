'use client';

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Expense, ChartData } from '@/lib/types';
import { generateCategoryChartData, getExpensesByCategory, formatCurrency } from '@/lib/utils';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface ExpenseChartProps {
  expenses: Expense[];
  type?: 'pie' | 'bar';
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses, type = 'pie' }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (expenses.length === 0) {
      setChartData(null);
      return;
    }

    const data = generateCategoryChartData(expenses);
    setChartData(data);

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== undefined) {
                label += formatCurrency(
                  type === 'pie' 
                    ? context.parsed 
                    : context.parsed.y
                );
              }
              return label;
            }
          }
        }
      },
    };

    if (type === 'bar') {
      setChartOptions({
        ...options,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return formatCurrency(value);
              }
            }
          }
        }
      });
    } else {
      setChartOptions(options);
    }
  }, [expenses, type]);

  if (!chartData || expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No data available for chart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
      <div className="h-64">
        {type === 'pie' ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;