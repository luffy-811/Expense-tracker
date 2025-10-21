// API Base URLs
const EXPENSE_API_URL = "http://localhost:8080/api/expenses";
const INCOME_API_URL = "http://localhost:8080/api/incomes";
const SUMMARY_API_URL = "http://localhost:8080/api/financial-summary";

// Global variables
let allExpenses = [];
let allIncomes = [];
let editingExpenseId = null;
let editingIncomeId = null;
let categoryChart = null;
let timelineChart = null;
let incomeCategoryChart = null;
let incomeTimelineChart = null;

// Initialize app
document.addEventListener("DOMContentLoaded", function() {
    console.log("App initializing...");
    initializeTabs();
    initializeDateFields();
    setupExpenseEventListeners();
    setupIncomeEventListeners();
    loadFinancialSummary();
    loadExpenses();
    loadIncomes();
});

// Tab Navigation
function initializeTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach(function(btn) {
        btn.classList.remove("active");
        if (btn.dataset.tab === tabName) {
            btn.classList.add("active");
        }
    });

    document.querySelectorAll(".tab-content").forEach(function(content) {
        content.classList.remove("active");
    });
    
    if (tabName === "expenses") {
        document.getElementById("expenses-section").classList.add("active");
    } else if (tabName === "income") {
        document.getElementById("income-section").classList.add("active");
    }
}

// Initialize date fields
function initializeDateFields() {
    const today = new Date().toISOString().split("T")[0];
    const dateField = document.getElementById("date");
    const incomeDateField = document.getElementById("income-date");
    
    if (dateField) dateField.value = today;
    if (incomeDateField) incomeDateField.value = today;
}

// Load Financial Summary
async function loadFinancialSummary() {
    try {
        const response = await fetch(SUMMARY_API_URL);
        if (!response.ok) {
            console.error("Failed to fetch financial summary");
            return;
        }
        
        const summary = await response.json();
        console.log("Financial Summary:", summary);
        
        document.getElementById("total-income").textContent = "$" + summary.totalIncome.toFixed(2);
        document.getElementById("total-expenses").textContent = "$" + summary.totalExpenses.toFixed(2);
        
        const balanceElement = document.getElementById("balance");
        const balance = summary.balance;
        balanceElement.textContent = "$" + Math.abs(balance).toFixed(2);
        
        balanceElement.classList.remove("positive", "negative");
        if (balance >= 0) {
            balanceElement.classList.add("positive");
        } else {
            balanceElement.classList.add("negative");
            balanceElement.textContent = "-$" + Math.abs(balance).toFixed(2);
        }
    } catch (error) {
        console.error("Error loading financial summary:", error);
    }
}

// EXPENSE FUNCTIONS
function setupExpenseEventListeners() {
    const form = document.getElementById("expense-form");
    const cancelBtn = document.getElementById("cancel-btn");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    
    if (form) form.addEventListener("submit", handleExpenseFormSubmit);
    if (cancelBtn) cancelBtn.addEventListener("click", resetExpenseForm);
    if (searchInput) searchInput.addEventListener("input", filterExpenses);
    if (categoryFilter) categoryFilter.addEventListener("change", filterExpenses);
}

async function loadExpenses() {
    try {
        console.log("Loading expenses...");
        const response = await fetch(EXPENSE_API_URL);
        if (!response.ok) throw new Error("Failed to fetch expenses");
        
        allExpenses = await response.json();
        console.log("Expenses loaded:", allExpenses.length);
        displayExpenses(allExpenses);
        renderExpenseCharts();
        loadFinancialSummary();
    } catch (error) {
        console.error("Error loading expenses:", error);
        showNotification("Error loading expenses: " + error.message, "error");
    }
}

function displayExpenses(expenses) {
    const expensesList = document.getElementById("expenses-list");
    const totalAmountSpan = document.getElementById("total-amount");

    if (!expensesList || !totalAmountSpan) {
        console.error("Expense list elements not found");
        return;
    }

    if (expenses.length === 0) {
        expensesList.innerHTML = "<p class=\"empty-message\">No expenses found. Start by adding your first expense!</p>";
        totalAmountSpan.textContent = "0.00";
        return;
    }

    const total = expenses.reduce(function(sum, expense) {
        return sum + parseFloat(expense.amount);
    }, 0);
    totalAmountSpan.textContent = total.toFixed(2);

    expensesList.innerHTML = expenses.map(function(expense) {
        return `
        <div class="expense-card" data-category="${expense.category}">
            <div class="expense-header">
                <h3>${expense.description}</h3>
                <span class="expense-amount">$${parseFloat(expense.amount).toFixed(2)}</span>
            </div>
            <div class="expense-details">
                <span class="expense-category category-${expense.category.toLowerCase()}">${expense.category}</span>
                <span class="expense-date"> ${new Date(expense.date).toLocaleDateString()}</span>
            </div>
            <div class="expense-actions">
                <button class="btn-edit" onclick="editExpense(${expense.id})">Edit</button>
                <button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        </div>
        `;
    }).join("");
}

async function handleExpenseFormSubmit(e) {
    e.preventDefault();
    console.log("Submitting expense form...");

    const expenseData = {
        description: document.getElementById("description").value,
        amount: parseFloat(document.getElementById("amount").value),
        date: document.getElementById("date").value,
        category: document.getElementById("category").value
    };

    console.log("Expense data:", expenseData);

    try {
        let response;
        if (editingExpenseId) {
            response = await fetch(EXPENSE_API_URL + "/" + editingExpenseId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(expenseData)
            });
        } else {
            response = await fetch(EXPENSE_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(expenseData)
            });
        }

        if (!response.ok) {
            const errorData = await response.json().catch(function() { return {}; });
            throw new Error(errorData.message || "Server error: " + response.status);
        }

        console.log("Expense saved successfully");
        showNotification(editingExpenseId ? "Expense updated successfully!" : "Expense added successfully!", "success");
        resetExpenseForm();
        loadExpenses();
    } catch (error) {
        console.error("Error saving expense:", error);
        showNotification("Error saving expense: " + error.message, "error");
    }
}

function editExpense(id) {
    const expense = allExpenses.find(function(e) { return e.id === id; });
    if (!expense) return;

    editingExpenseId = id;
    document.getElementById("description").value = expense.description;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("date").value = expense.date;
    document.getElementById("category").value = expense.category;

    document.getElementById("form-title").textContent = "Edit Expense";
    document.getElementById("submit-btn").textContent = "Update Expense";
    document.getElementById("cancel-btn").style.display = "inline-block";

    document.querySelector(".expense-form-section").scrollIntoView({ behavior: "smooth" });
}

async function deleteExpense(id) {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
        const response = await fetch(EXPENSE_API_URL + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete expense");

        showNotification("Expense deleted successfully!", "success");
        loadExpenses();
    } catch (error) {
        console.error("Error deleting expense:", error);
        showNotification("Error deleting expense", "error");
    }
}

function resetExpenseForm() {
    editingExpenseId = null;
    document.getElementById("expense-form").reset();
    document.getElementById("form-title").textContent = "Add New Expense";
    document.getElementById("submit-btn").textContent = "Add Expense";
    document.getElementById("cancel-btn").style.display = "none";
    initializeDateFields();
}

function filterExpenses() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const categoryFilter = document.getElementById("category-filter").value;

    const filtered = allExpenses.filter(function(expense) {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm) ||
                            expense.amount.toString().includes(searchTerm);
        const matchesCategory = !categoryFilter || expense.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    displayExpenses(filtered);
}

function renderExpenseCharts() {
    renderExpenseCategoryChart();
    renderExpenseTimelineChart();
}

function renderExpenseCategoryChart() {
    const categoryData = {};
    allExpenses.forEach(function(expense) {
        categoryData[expense.category] = (categoryData[expense.category] || 0) + parseFloat(expense.amount);
    });

    const ctx = document.getElementById("category-chart");
    if (!ctx) return;
    
    if (categoryChart) {
        categoryChart.destroy();
    }

    if (Object.keys(categoryData).length === 0) {
        return;
    }

    categoryChart = new Chart(ctx.getContext("2d"), {
        type: "doughnut",
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
                    "#9966FF", "#FF9F40", "#FF6384", "#C9CBCF"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

function renderExpenseTimelineChart() {
    const dateData = {};
    allExpenses.forEach(function(expense) {
        const date = expense.date;
        dateData[date] = (dateData[date] || 0) + parseFloat(expense.amount);
    });

    const sortedDates = Object.keys(dateData).sort();
    const amounts = sortedDates.map(function(date) { return dateData[date]; });

    const ctx = document.getElementById("timeline-chart");
    if (!ctx) return;
    
    if (timelineChart) {
        timelineChart.destroy();
    }

    if (sortedDates.length === 0) {
        return;
    }

    timelineChart = new Chart(ctx.getContext("2d"), {
        type: "line",
        data: {
            labels: sortedDates.map(function(date) { return new Date(date).toLocaleDateString(); }),
            datasets: [{
                label: "Daily Expenses",
                data: amounts,
                borderColor: "#e74c3c",
                backgroundColor: "rgba(231, 76, 60, 0.1)",
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// INCOME FUNCTIONS
function setupIncomeEventListeners() {
    const form = document.getElementById("income-form");
    const cancelBtn = document.getElementById("income-cancel-btn");
    const searchInput = document.getElementById("income-search");
    const categoryFilter = document.getElementById("income-category-filter");
    
    if (form) form.addEventListener("submit", handleIncomeFormSubmit);
    if (cancelBtn) cancelBtn.addEventListener("click", resetIncomeForm);
    if (searchInput) searchInput.addEventListener("input", filterIncomes);
    if (categoryFilter) categoryFilter.addEventListener("change", filterIncomes);
}

async function loadIncomes() {
    try {
        console.log("Loading incomes...");
        const response = await fetch(INCOME_API_URL);
        if (!response.ok) throw new Error("Failed to fetch incomes");
        
        allIncomes = await response.json();
        console.log("Incomes loaded:", allIncomes.length);
        displayIncomes(allIncomes);
        renderIncomeCharts();
        loadFinancialSummary();
    } catch (error) {
        console.error("Error loading incomes:", error);
        showNotification("Error loading incomes: " + error.message, "error");
    }
}

function displayIncomes(incomes) {
    const incomeList = document.getElementById("income-list");
    const totalAmountSpan = document.getElementById("total-income-amount");

    if (!incomeList || !totalAmountSpan) {
        console.error("Income list elements not found");
        return;
    }

    if (incomes.length === 0) {
        incomeList.innerHTML = "<p class=\"empty-message\">No income found. Start by adding your first income entry!</p>";
        totalAmountSpan.textContent = "0.00";
        return;
    }

    const total = incomes.reduce(function(sum, income) {
        return sum + parseFloat(income.amount);
    }, 0);
    totalAmountSpan.textContent = total.toFixed(2);

    incomeList.innerHTML = incomes.map(function(income) {
        return `
        <div class="expense-card income-card-item" data-category="${income.category}">
            <div class="expense-header">
                <h3>${income.source}</h3>
                <span class="expense-amount income-amount">+$${parseFloat(income.amount).toFixed(2)}</span>
            </div>
            <div class="expense-details">
                <span class="expense-category income-category-${income.category.toLowerCase()}">${income.category}</span>
                <span class="expense-date"> ${new Date(income.date).toLocaleDateString()}</span>
            </div>
            ${income.description ? `<p class="income-description">${income.description}</p>` : ""}
            <div class="expense-actions">
                <button class="btn-edit" onclick="editIncome(${income.id})">Edit</button>
                <button class="btn-delete" onclick="deleteIncome(${income.id})">Delete</button>
            </div>
        </div>
        `;
    }).join("");
}

async function handleIncomeFormSubmit(e) {
    e.preventDefault();
    console.log("Submitting income form...");

    const incomeData = {
        source: document.getElementById("income-source").value,
        amount: parseFloat(document.getElementById("income-amount").value),
        date: document.getElementById("income-date").value,
        category: document.getElementById("income-category").value,
        description: document.getElementById("income-description").value || null
    };

    console.log("Income data:", incomeData);

    try {
        let response;
        if (editingIncomeId) {
            response = await fetch(INCOME_API_URL + "/" + editingIncomeId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(incomeData)
            });
        } else {
            response = await fetch(INCOME_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(incomeData)
            });
        }

        if (!response.ok) {
            const errorData = await response.json().catch(function() { return {}; });
            throw new Error(errorData.message || "Server error: " + response.status);
        }

        console.log("Income saved successfully");
        showNotification(editingIncomeId ? "Income updated successfully!" : "Income added successfully!", "success");
        resetIncomeForm();
        loadIncomes();
    } catch (error) {
        console.error("Error saving income:", error);
        showNotification("Error saving income: " + error.message, "error");
    }
}

function editIncome(id) {
    const income = allIncomes.find(function(i) { return i.id === id; });
    if (!income) return;

    editingIncomeId = id;
    document.getElementById("income-source").value = income.source;
    document.getElementById("income-amount").value = income.amount;
    document.getElementById("income-date").value = income.date;
    document.getElementById("income-category").value = income.category;
    document.getElementById("income-description").value = income.description || "";

    document.getElementById("income-form-title").textContent = "Edit Income";
    document.getElementById("income-submit-btn").textContent = "Update Income";
    document.getElementById("income-cancel-btn").style.display = "inline-block";

    const incomeSection = document.querySelector("#income-section .expense-form-section");
    if (incomeSection) incomeSection.scrollIntoView({ behavior: "smooth" });
}

async function deleteIncome(id) {
    if (!confirm("Are you sure you want to delete this income entry?")) return;

    try {
        const response = await fetch(INCOME_API_URL + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete income");

        showNotification("Income deleted successfully!", "success");
        loadIncomes();
    } catch (error) {
        console.error("Error deleting income:", error);
        showNotification("Error deleting income", "error");
    }
}

function resetIncomeForm() {
    editingIncomeId = null;
    const form = document.getElementById("income-form");
    if (form) form.reset();
    document.getElementById("income-form-title").textContent = "Add New Income";
    document.getElementById("income-submit-btn").textContent = "Add Income";
    document.getElementById("income-cancel-btn").style.display = "none";
    initializeDateFields();
}

function filterIncomes() {
    const searchTerm = document.getElementById("income-search").value.toLowerCase();
    const categoryFilter = document.getElementById("income-category-filter").value;

    const filtered = allIncomes.filter(function(income) {
        const matchesSearch = income.source.toLowerCase().includes(searchTerm) ||
                            income.amount.toString().includes(searchTerm) ||
                            (income.description && income.description.toLowerCase().includes(searchTerm));
        const matchesCategory = !categoryFilter || income.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    displayIncomes(filtered);
}

function renderIncomeCharts() {
    renderIncomeCategoryChart();
    renderIncomeTimelineChart();
}

function renderIncomeCategoryChart() {
    const categoryData = {};
    allIncomes.forEach(function(income) {
        categoryData[income.category] = (categoryData[income.category] || 0) + parseFloat(income.amount);
    });

    const ctx = document.getElementById("income-category-chart");
    if (!ctx) return;
    
    if (incomeCategoryChart) {
        incomeCategoryChart.destroy();
    }

    if (Object.keys(categoryData).length === 0) {
        return;
    }

    incomeCategoryChart = new Chart(ctx.getContext("2d"), {
        type: "doughnut",
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: [
                    "#50c878", "#36A2EB", "#4BC0C0", "#9966FF",
                    "#FF9F40", "#FFCE56", "#FF6384", "#C9CBCF"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

function renderIncomeTimelineChart() {
    const dateData = {};
    allIncomes.forEach(function(income) {
        const date = income.date;
        dateData[date] = (dateData[date] || 0) + parseFloat(income.amount);
    });

    const sortedDates = Object.keys(dateData).sort();
    const amounts = sortedDates.map(function(date) { return dateData[date]; });

    const ctx = document.getElementById("income-timeline-chart");
    if (!ctx) return;
    
    if (incomeTimelineChart) {
        incomeTimelineChart.destroy();
    }

    if (sortedDates.length === 0) {
        return;
    }

    incomeTimelineChart = new Chart(ctx.getContext("2d"), {
        type: "line",
        data: {
            labels: sortedDates.map(function(date) { return new Date(date).toLocaleDateString(); }),
            datasets: [{
                label: "Daily Income",
                data: amounts,
                borderColor: "#50c878",
                backgroundColor: "rgba(80, 200, 120, 0.1)",
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// UTILITY FUNCTIONS
function showNotification(message, type) {
    if (typeof type === "undefined") type = "info";
    
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach(function(n) { n.remove(); });
    
    const notification = document.createElement("div");
    notification.className = "notification notification-" + type;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.classList.add("show");
    }, 100);
    
    setTimeout(function() {
        notification.classList.remove("show");
        setTimeout(function() { notification.remove(); }, 300);
    }, 3000);
}
