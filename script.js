// Get HTML elements
const form = document.getElementById("transactionForm");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");
const clearAllButton = document.getElementById("clearAll");
// Get transactions from localStorage
let transactions =
 JSON.parse(localStorage.getItem("transactions")) || [];
// Category icons
const categoryIcons = {
 Food: "🍔",
 Transport: "🚕",
 Shopping: "🛍️",
 Bills: "🏠",
 Entertainment: "🎮",
KMC COLLEGE KHOPOLI DEPARTMENT OF COMPUTER SCIENCE Page [ ]
 Health: "💊",
 Education: "📚",
 Other: "📦"
};
// Add transaction
form.addEventListener("submit", function (event) {
event.preventDefault();
const amount = Number(amountInput.value);
 const type = typeInput.value;
 const category = categoryInput.value;
 const description = descriptionInput.value;
 const date = dateInput.value;
 const transaction = {
 id: Date.now(),
 amount: amount,
 type: type,
 category: category,
 description: description,
 date: date
 };
transactions.push(transaction);
 saveTransactions();
 displayTransactions();
KMC COLLEGE KHOPOLI DEPARTMENT OF COMPUTER SCIENCE Page [ ]
 updateSummary();
 form.reset();
});
// Save transactions
function saveTransactions() 
localStorage.setItem(
 "transactions",
 JSON.stringify(transactions)
 );
}
// Display transactions
function displayTransactions() {
 transactionList.innerHTML = "";
 if (transactions.length === 0) {
 transactionList.innerHTML = `
 <p class="empty">
 No transactions yet.
 </p>
 `;
return;
}
// Show newest transactions first
const reversedTransactions = [...transactions].reverse();
KMC COLLEGE KHOPOLI DEPARTMENT OF COMPUTER SCIENCE Page [ ]
 reversedTransactions.forEach(function (transaction) {
const transactionElement = document.createElement("div");
transactionElement.classList.add("transaction");
 const sign = transaction.type === "income"
 ? "+"
 : "-";
 const amountClass = transaction.type === "income"
 ? "income-amount"
 : "expense-amount";
 const icon = categoryIcons[transaction.category] || "📦";
 transactionElement.innerHTML = `
 <div class="transaction-info">
 <div class="category-icon">
 ${icon}
 </div>
<div>
<h4>
 ${transaction.description}
 </h4>
<small>
 ${transaction.category}
 •
 ${transaction.date}
KMC COLLEGE KHOPOLI DEPARTMENT OF COMPUTER SCIENCE Page [ ]
 </small></div>
<div class="transaction-right">
<span class="amount ${amountClass}">
 ${sign} ₹${transaction.amount.toLocaleString("en-IN")}
 </span>
<button
 class="delete-btn"
 onclick="deleteTransaction(${transaction.id})"
 >
 🗑️
 </button>
</div>
 `;
 transactionList.appendChild(transactionElement);
});
}
// Update summary
function updateSummary() 
let income = 0;
 let expense = 0;
transactions.forEach(function (transaction) {
if (transaction.type === "income") {
income += transaction.amount;
KMC COLLEGE KHOPOLI DEPARTMENT OF COMPUTER SCIENCE Page [ ]
 } else {
expense += transaction.amount;
}});
const balance = income - expense;
 incomeElement.textContent =
 "₹" + income.toLocaleString("en-IN");
 expenseElement.textContent =
 "₹" + expense.toLocaleString("en-IN");
 balanceElement.textContent =
 "₹" + balance.toLocaleString("en-IN");
}
// Delete transaction
function deleteTransaction(id) {
transactions = transactions.filter(function (transaction) {
return transaction.id !== id;
});
saveTransactions();
displayTransactions();
updateSummary();}
// Clear all transactions
clearAllButton.addEventListener("click", function () {
 if (transactions.length === 0) {
 return. }
KMC COLLEGE KHOPOLI DEPARTMENT OF COMPUTER SCIENCE Page [ ]
 const confirmDelete = confirm(
 "Are you sure you want to delete all transactions?"
 );
if (confirmDelete) {
transactions = [];
saveTransactions();
 displayTransactions();
updateSummary();}});
// Display data when page loads
displayTransactions();
updateSummary();