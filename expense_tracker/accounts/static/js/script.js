const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
);

let transactions =
    localStorage.getItem("transactions") !== null
        ? localStorageTransactions
        : [];

// Add Transactions
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please add a expense and amount");
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);

        addTransactionToDOM(transaction);

        updateLocalStoarge();

        updateValues();

        text.value = "";
        amount.value = "";
    }
}

// Add Transactions To The DOM List
function addTransactionToDOM(transaction) {
    // Get the sign plus or minus
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    // Add classes based on the value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
        ${transaction.text} <span>${sign}₹${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onClick="removeTransaction(${
        transaction.id
    })">x</button>
    `;
    list.appendChild(item);
}

// Update the balance, income, and expenses
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (
        amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `₹${total}`;
    money_plus.innerText = `+₹${income}`;
    money_minus.innerText = `-₹${expense}`;
}

// Delete The Transactions by ID
function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    updateLocalStoarge();

    init();
}

// Update The Local Storage
function updateLocalStoarge() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialize the App
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionToDOM);
    updateValues();
}

init();

// Generate a Random ID
function generateId() {
    return Math.floor(Math.random() * 100000000);
}

form.addEventListener("submit", addTransaction);

function editExpense(id, name, amount) {
    document.getElementById('expense_id').value = id;
    document.getElementById('text').value = name;
    document.getElementById('amount').value = amount;
}

// Function to update the balance, income, and expense dynamically
function updateBalance(expenses) {
    let income = 0;
    let expense = 0;

    // Calculate income and expense
    expenses.forEach(transaction => {
        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expense += Math.abs(transaction.amount);
        }
    });

    // Update balance, income, and expense
    const balance = income - expense;
    document.getElementById('balance').innerText = `₹${balance.toFixed(2)}`;
    document.getElementById('money-plus').innerText = `+₹${income.toFixed(2)}`;
    document.getElementById('money-minus').innerText = `-₹${expense.toFixed(2)}`;
}


function updateBalance(expenses) {
    let income = 0;
    let expense = 0;

    expenses.forEach(transaction => {
        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expense += Math.abs(transaction.amount);
        }
    });

    const balance = income - expense;

    document.getElementById('balance').innerText = `₹${balance.toFixed(2)}`;
    document.getElementById('money-plus').innerText = `+₹${income.toFixed(2)}`;
    document.getElementById('money-minus').innerText = `-₹${expense.toFixed(2)}`;
}

function deleteExpense(id) {
    // Send a DELETE request to Django backend
    fetch(`/delete/${id}/`, { method: 'GET' })
        .then(response => {
            if (response.ok) {
                // Remove the expense from the local expenses array
                expenses = expenses.filter(expense => expense.id !== id);

                // Update the UI
                const list = document.getElementById('list');
                const listItem = Array.from(list.children).find(
                    item => item.querySelector('.delete-btn').getAttribute('href') === `/delete/${id}/`
                );
                if (listItem) listItem.remove();

                // Update the balance
                updateBalance(expenses);
            }
        })
        .catch(error => console.error('Error deleting expense:', error));
}
