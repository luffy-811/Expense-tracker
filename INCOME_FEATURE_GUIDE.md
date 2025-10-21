# 💰 Income Tracking Feature - User Guide

## Overview
The Financial Tracker now includes comprehensive income tracking alongside expense management, giving you a complete picture of your financial health.

---

## 🎯 New Features

### 1. Financial Summary Dashboard
At the top of the page, you'll see three summary cards:

- **💵 Total Income**: Shows the sum of all your income entries
- **💸 Total Expenses**: Shows the sum of all your expenses
- **💰 Balance**: Shows your net balance (Income - Expenses)
  - Green: Positive balance (you're saving!)
  - Red: Negative balance (spending more than earning)

### 2. Tab Navigation
Switch between **Expenses** and **Income** tabs to manage each separately:
- Click "Expenses" tab to manage your spending
- Click "Income" tab to manage your earnings

---

## 📝 Adding Income

### Step 1: Navigate to Income Tab
Click the **"Income"** tab in the navigation bar

### Step 2: Fill Out the Form
- **Source**: Name of the income source (e.g., "Monthly Salary", "Freelance Project")
- **Amount**: The amount received (e.g., 5000.00)
- **Date**: When you received the income
- **Category**: Select from 7 categories:
  - 💼 **Salary**: Regular employment income
  - 🎨 **Freelance**: Freelance or contract work
  - 📈 **Investment**: Returns from investments
  - 🏢 **Business**: Business revenue
  - 🎁 **Gift**: Monetary gifts received
  - 🎉 **Bonus**: Work bonuses or incentives
  - 📦 **Other**: Any other income
- **Description** (Optional): Add notes about the income

### Step 3: Submit
Click **"Add Income"** button

---

## ✏️ Editing Income

1. Find the income entry you want to edit
2. Click the **"Edit"** button
3. Modify the details in the form
4. Click **"Update Income"**

---

## 🗑️ Deleting Income

1. Find the income entry you want to delete
2. Click the **"Delete"** button
3. Confirm the deletion

---

## 🔍 Searching & Filtering Income

### Search Bar
- Search by source name, amount, or description
- Results update as you type

### Category Filter
- Use the dropdown to filter by specific income categories
- Select "All Categories" to see everything

---

## 📊 Income Analytics

### Income by Category Chart
- **Doughnut chart** showing income distribution across categories
- Visual breakdown of your income sources
- Helps identify primary income sources

### Income Over Time Chart
- **Line chart** showing income trends
- Track how your income changes over time
- Spot patterns and trends

---

## 🆕 API Endpoints

### Income Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/incomes` | Get all income entries |
| GET | `/api/incomes/{id}` | Get specific income entry |
| POST | `/api/incomes` | Create new income entry |
| PUT | `/api/incomes/{id}` | Update income entry |
| DELETE | `/api/incomes/{id}` | Delete income entry |
| GET | `/api/incomes/category/{category}` | Get incomes by category |
| GET | `/api/incomes/date-range?startDate=&endDate=` | Get incomes in date range |
| GET | `/api/incomes/analytics/by-category` | Get category analytics |
| GET | `/api/incomes/analytics/by-date` | Get date analytics |
| GET | `/api/incomes/total` | Get total income |

### Financial Summary Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/financial-summary` | Get complete financial overview |
| GET | `/api/financial-summary/date-range?startDate=&endDate=` | Get summary for date range |

---

## 💡 Usage Tips

### 1. Regular Updates
- Add income as soon as you receive it
- Keep descriptions clear for future reference

### 2. Categorize Accurately
- Use correct categories for better analytics
- Consistent categorization helps with tracking

### 3. Monitor Your Balance
- Check the dashboard regularly
- Green balance = saving money ✅
- Red balance = spending more than earning ⚠️

### 4. Use Date Filters
- Filter by date ranges to analyze specific periods
- Compare income across months or quarters

### 5. Review Analytics
- Check category charts to see income sources
- Use timeline charts to spot trends

---

## 🎨 Income Categories Explained

| Category | Use For | Examples |
|----------|---------|----------|
| **Salary** | Regular employment | Monthly paycheck, annual salary |
| **Freelance** | Contract/gig work | Consulting fees, project payments |
| **Investment** | Investment returns | Dividends, interest, capital gains |
| **Business** | Business revenue | Sales, client payments |
| **Gift** | Money received as gifts | Birthday money, holiday gifts |
| **Bonus** | Work-related bonuses | Performance bonus, commission |
| **Other** | Miscellaneous | Tax refunds, cashback, rewards |

---

## 🔧 Technical Details

### Database
- New `incomes` table created automatically
- Fields: id, source, amount, date, category, description, created_at, updated_at
- Same validation as expenses

### Data Validation
- Source: Required, cannot be blank
- Amount: Required, must be positive
- Date: Required, valid date format
- Category: Required, must be from predefined list
- Description: Optional, max 500 characters

---

## 📱 Mobile Responsive
The income feature is fully responsive:
- Works on phones, tablets, and desktops
- Touch-friendly buttons and forms
- Charts adapt to screen size

---

## 🚀 Quick Start Example

1. **Add Your First Income:**
   ```
   Source: Monthly Salary
   Amount: 5000.00
   Date: 2025-10-05
   Category: Salary
   Description: October salary payment
   ```

2. **Add an Expense:**
   ```
   Description: Groceries
   Amount: 150.00
   Date: 2025-10-05
   Category: Food
   ```

3. **Check Your Dashboard:**
   - Total Income: $5,000.00 ✅
   - Total Expenses: $150.00 ✅
   - Balance: $4,850.00 (Green - Positive!) ✅

---

## 🎯 Benefits

✅ **Complete Financial Picture** - Track both sides of your finances  
✅ **Better Budgeting** - Know your net income vs. expenses  
✅ **Identify Income Trends** - See which income sources grow over time  
✅ **Financial Planning** - Make informed decisions based on real data  
✅ **Goal Tracking** - Monitor if you're saving or overspending  

---

## 🆘 Troubleshooting

**Income not appearing?**
- Check if you're on the Income tab
- Clear category filter
- Refresh the page

**Charts not updating?**
- Add at least one income entry
- Refresh the page
- Check browser console for errors

**Can't edit income?**
- Make sure you're clicking Edit button
- Check all required fields are filled
- Verify amount is positive

---

## 📞 Support

If you encounter any issues:
1. Check browser console (F12)
2. Verify backend is running (localhost:8080)
3. Check MySQL connection is active
4. Review API endpoint responses

---

**Enjoy tracking your complete financial picture!** 💰📊✨
