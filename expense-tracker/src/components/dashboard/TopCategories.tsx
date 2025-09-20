'use client';

import React from 'react';
import { ExpenseCategory } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_COLORS } from '@/lib/constants';

interface TopCategoriesProps {
  categories: { category: ExpenseCategory; amount: number }[];
  totalAmount: number;
}

const TopCategories: React.FC<TopCategoriesProps> = ({ categories, totalAmount }) => {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Top Categories</h3>
        <div className="text-center py-4">
          <p className="text-gray-500">No categories data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">Top Categories</h3>
      <div className="space-y-4">
        {categories.map(({ category, amount }) => {
          const percentage = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;
          
          return (
            <div key={category}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{category}</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                  <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: CATEGORY_COLORS[category],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategories;