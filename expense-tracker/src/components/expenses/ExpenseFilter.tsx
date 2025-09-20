'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ExpenseFilterOptions, ExpenseCategory } from '@/lib/types';
import { EXPENSE_CATEGORIES } from '@/lib/constants';

interface ExpenseFilterProps {
  onFilter: (filters: ExpenseFilterOptions) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<ExpenseCategory | ''>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as ExpenseCategory | '');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = () => {
    const filters: ExpenseFilterOptions = {};

    if (startDate) {
      filters.startDate = startDate.toISOString().split('T')[0];
    }

    if (endDate) {
      filters.endDate = endDate.toISOString().split('T')[0];
    }

    if (category) {
      filters.category = category as ExpenseCategory;
    }

    if (searchQuery.trim()) {
      filters.searchQuery = searchQuery.trim();
    }

    onFilter(filters);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setCategory('');
    setSearchQuery('');
    onFilter({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="From"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="To"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="">All Categories</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search in description..."
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleFilter}
          className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ExpenseFilter;