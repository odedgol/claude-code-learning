# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14.

## Features

- **Dashboard**: View spending summaries and analytics
- **Expense Management**: Add, edit, delete, and filter expenses
- **Categories**: Organize expenses by predefined categories
- **Data Visualization**: Charts for expense breakdown
- **Data Export**: Export expense data to CSV
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Data persistence using browser localStorage

## Tech Stack

- **Next.js 14** with App Router for routing and server components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **React Datepicker** for date selection
- **LocalStorage API** for data persistence

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Dashboard

The dashboard provides an overview of your expenses with summary cards showing:
- Total expenses
- Monthly expenses
- Average daily spending
- Number of expenses

It also includes visual representations of your spending by category and a list of recent expenses.

### Managing Expenses

#### Adding Expenses

1. Click on "Add Expense" in the navigation or on the homepage
2. Fill out the expense form with:
   - Date
   - Amount
   - Category
   - Description
3. Click "Add Expense" to save

#### Viewing and Filtering Expenses

1. Go to the "Expenses" page
2. Use the filter panel to search and filter by:
   - Date range
   - Category
   - Search terms
3. Sort expenses by clicking on column headers

#### Editing and Deleting Expenses

- Click "Edit" on any expense to modify its details
- Click "Delete" to remove an expense (requires confirmation)

### Exporting Data

1. Go to the "Expenses" page
2. Click "Export CSV" to download your expense data
3. The file will include all currently filtered expenses

## Project Structure

```
expense-tracker/
├── src/                    # Source files
│   ├── app/                # Next.js app router pages
│   ├── components/         # React components
│   │   ├── charts/         # Chart components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── expenses/       # Expense listing components
│   │   ├── forms/          # Form components
│   │   └── ui/             # UI components like navbar
│   └── lib/                # Utilities and helpers
│       ├── constants.ts    # Application constants
│       ├── storage.ts      # LocalStorage interaction
│       ├── types.ts        # TypeScript type definitions
│       └── utils.ts        # Utility functions
├── public/                 # Static files
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## Future Improvements

- User authentication
- Backend integration for data persistence
- Multiple currency support
- Budget setting and tracking
- Receipt image upload
- Recurring expenses
- Data import from CSV/Excel
- Dark mode

## License

This project is licensed under the MIT License - see the LICENSE file for details.