document.addEventListener('DOMContentLoaded', () => {
    const budgetForm = document.getElementById('budget-form');
    const expensesList = document.getElementById('expenses-list');
    const goalsTextarea = document.getElementById('goals');
    const remindersTextarea = document.getElementById('reminders');
    const deleteBudgetBtn = document.getElementById('delete-budget'); // New delete button

    // Load saved data from localStorage
    const savedBudget = localStorage.getItem('budget');
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const savedGoals = localStorage.getItem('goals') || '';
    const savedReminders = localStorage.getItem('reminders') || '';

    // Display saved budget, expenses, goals, and reminders
    if (savedBudget) alert(`Your saved budget: $${savedBudget}`);
    expensesList.innerHTML = savedExpenses.map(
        (expense) => `<li>${expense.description}: $${expense.amount}</li>`
    ).join('');
    goalsTextarea.value = savedGoals;
    remindersTextarea.value = savedReminders;

    // Set Budget
    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const budgetInput = document.getElementById('budget').value;
        localStorage.setItem('budget', budgetInput);
        alert(`Budget set to: $${budgetInput}`);
    });

    // Delete Budget
    deleteBudgetBtn.addEventListener('click', () => {
        localStorage.removeItem('budget');
        alert('Budget has been deleted.');
    });

    // Add Expense
    const addExpense = (description, amount) => {
        savedExpenses.push({ description, amount });
        localStorage.setItem('expenses', JSON.stringify(savedExpenses));
        expensesList.innerHTML = savedExpenses.map(
            (expense) => `<li>${expense.description}: $${expense.amount}</li>`
        ).join('');
    };

    // Mock expense addition (add a form in future if required)
    addExpense('Groceries', 50);
    addExpense('Utilities', 100);

    // Save Goals
    goalsTextarea.addEventListener('input', () => {
        localStorage.setItem('goals', goalsTextarea.value);
    });

    // Save Reminders
    remindersTextarea.addEventListener('input', () => {
        localStorage.setItem('reminders', remindersTextarea.value);
    });
});
