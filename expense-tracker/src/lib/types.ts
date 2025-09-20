export type ExpenseCategory = 
  | 'Food' 
  | 'Transportation' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Bills' 
  | 'Other';

export interface Expense {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
}

export interface ExpenseFormData {
  date: string;
  amount: number | string;
  category: ExpenseCategory;
  description: string;
}

export interface ExpenseFilterOptions {
  startDate?: string;
  endDate?: string;
  category?: ExpenseCategory;
  searchQuery?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface DashboardSummary {
  totalExpenses: number;
  monthlyExpenses: number;
  topCategories: { category: ExpenseCategory; amount: number }[];
  recentExpenses: Expense[];
}